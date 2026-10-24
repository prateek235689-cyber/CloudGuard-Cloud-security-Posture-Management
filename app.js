const STORAGE_KEY = "cloudguard-demo-statuses";

const findings = [
  { id: "CG-001", title: "Public object storage access", severity: "Critical", service: "Amazon S3", resource: "customer-data-demo", status: "Open", recommendation: "Block public access and review the bucket policy." },
  { id: "CG-002", title: "Administrative access too broad", severity: "Critical", service: "AWS IAM", resource: "DemoAdminPolicy", status: "Open", recommendation: "Apply least privilege and restrict wildcard permissions." },
  { id: "CG-003", title: "Security group allows SSH from anywhere", severity: "High", service: "Amazon EC2", resource: "sg-demo-ssh", status: "Open", recommendation: "Restrict SSH access to approved trusted IP addresses." },
  { id: "CG-004", title: "Cloud audit logging not enabled", severity: "High", service: "AWS CloudTrail", resource: "demo-trail", status: "In Progress", recommendation: "Enable multi-region trail logging and protect log storage." },
  { id: "CG-005", title: "Storage encryption configuration review", severity: "Medium", service: "Amazon S3", resource: "reports-demo", status: "Open", recommendation: "Verify default encryption and required key-management controls." },
  { id: "CG-006", title: "IAM user has no MFA configured", severity: "High", service: "AWS IAM", resource: "demo-analyst", status: "Resolved", recommendation: "Enable MFA and review console access requirements." },
  { id: "CG-007", title: "Database backup retention is short", severity: "Medium", service: "Amazon RDS", resource: "demo-database", status: "Open", recommendation: "Set backup retention to match recovery requirements." },
  { id: "CG-008", title: "Resource tagging is incomplete", severity: "Low", service: "Amazon EC2", resource: "i-demo-004", status: "Open", recommendation: "Apply the required owner, environment, and cost-center tags." }
];

const searchInput = document.querySelector("#search-input");
const severityFilter = document.querySelector("#severity-filter");
const statusFilter = document.querySelector("#status-filter");
const findingsBody = document.querySelector("#findings-body");
const exportButton = document.querySelector("#export-button");

function loadStatuses() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    findings.forEach(item => {
      const status = saved[item.id];
      if (["Open", "In Progress", "Resolved"].includes(status)) {
        item.status = status;
      }
    });
  } catch (error) {
    console.warn("Saved demo statuses could not be loaded.", error);
  }
}

function saveStatuses() {
  try {
    const statuses = Object.fromEntries(
      findings.map(item => [item.id, item.status])
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    alert("Browser storage is unavailable. Your status change may not persist.");
  }
}

function updateMetrics() {
  const open = findings.filter(item => item.status !== "Resolved");

  document.querySelector("#critical-count").textContent =
    open.filter(item => item.severity === "Critical").length;

  document.querySelector("#high-count").textContent =
    open.filter(item => item.severity === "High").length;

  document.querySelector("#resource-count").textContent =
    new Set(findings.map(item => item.resource)).size;

  document.querySelector("#resolved-count").textContent =
    findings.filter(item => item.status === "Resolved").length;
}

function renderFindings() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedSeverity = severityFilter.value;
  const selectedStatus = statusFilter.value;

  const filtered = findings.filter(item => {
    const searchable = [
      item.id, item.title, item.service,
      item.resource, item.recommendation
    ].join(" ").toLowerCase();

    return searchable.includes(query) &&
      (selectedSeverity === "All" || item.severity === selectedSeverity) &&
      (selectedStatus === "All" || item.status === selectedStatus);
  });

  document.querySelector("#finding-count").textContent =
    `${filtered.length} of ${findings.length} findings`;

  findingsBody.replaceChildren();

  if (filtered.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.className = "no-results";
    cell.textContent = "No findings match your search or filters.";
    row.appendChild(cell);
    findingsBody.appendChild(row);
    return;
  }

  filtered.forEach(item => {
    const row = document.createElement("tr");

    const findingCell = document.createElement("td");
    const title = document.createElement("strong");
    title.textContent = item.title;

    const id = document.createElement("small");
    id.className = "finding-id";
    id.textContent = item.id;

    const recommendation = document.createElement("small");
    recommendation.className = "recommendation";
    recommendation.textContent = `Remediation: ${item.recommendation}`;

    findingCell.append(title, id, recommendation);

    const severityCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `severity-badge ${item.severity.toLowerCase()}`;
    badge.textContent = item.severity;
    severityCell.appendChild(badge);

    const resourceCell = document.createElement("td");
    const service = document.createElement("strong");
    service.textContent = item.service;

    const resource = document.createElement("small");
    resource.className = "finding-id";
    resource.textContent = item.resource;
    resourceCell.append(service, resource);

    const statusCell = document.createElement("td");
    const select = document.createElement("select");
    select.className = "row-status";
    select.setAttribute("aria-label", `Status for ${item.id}`);

    ["Open", "In Progress", "Resolved"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = item.status === status;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      item.status = select.value;
      saveStatuses();
      updateMetrics();
      renderFindings();
    });

    statusCell.appendChild(select);
    row.append(findingCell, severityCell, resourceCell, statusCell);
    findingsBody.appendChild(row);
  });
}

function exportCSV() {
  const headers = [
    "ID", "Finding", "Severity", "Service",
    "Resource", "Status", "Remediation Recommendation"
  ];

  const rows = findings.map(item => [
    item.id, item.title, item.severity, item.service,
    item.resource, item.status, item.recommendation
  ]);

  const escapeCSV = value =>
    `"${String(value).replace(/"/g, '""')}"`;

  const csv = [headers, ...rows]
    .map(row => row.map(escapeCSV).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cloudguard-security-findings.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

searchInput.addEventListener("input", renderFindings);
severityFilter.addEventListener("change", renderFindings);
statusFilter.addEventListener("change", renderFindings);
exportButton.addEventListener("click", exportCSV);

loadStatuses();
updateMetrics();
renderFindings();
