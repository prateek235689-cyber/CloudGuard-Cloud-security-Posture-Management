# CloudGuard — Cloud Security Posture Management Dashboard

**Live Demo:** [Launch CloudGuard Dashboard](https://prateek235689-cyber.github.io/CloudGuard-Cloud-security-Posture-Management/)
**Project Repository:** [View Source Code on GitHub](https://github.com/prateek235689-cyber/CloudGuard-Cloud-security-Posture-Management)

CloudGuard is a cloud security posture management dashboard prototype designed to help security teams review simulated cloud misconfigurations, prioritize findings by severity, track remediation status, and export findings to CSV.

### Key Features
- Security overview and risk metrics
- Searchable and filterable security findings
- Severity and remediation-status tracking
- Status persistence in the browser
- CSV export for security findings
- Responsive dashboard interface

### Technology
HTML · CSS · JavaScript · GitHub Pages

**Note:** This is a portfolio demonstration using simulated findings. It does not perform live AWS security scans.

# CloudGuard — Cloud Security Posture Management Dashboard
CloudGuard is a lightweight, interactive Cloud Security Posture Management (CSPM) dashboard prototype designed to demonstrate cloud security finding triage, risk visibility, and remediation tracking.

## Project Overview:
CloudGuard presents sample cloud security findings in a centralized dashboard. Security analysts can review findings, filter by severity and status, search for affected resources, track remediation progress, and export findings for reporting.

**Important:** This project currently uses simulated demonstration findings. It does not connect to an AWS account or perform live cloud security scans.

## Features:
- **Security overview:** Summary metrics for critical and high-severity findings, affected resources, and resolved findings.
- **Findings management:** Review eight sample cloud security findings.
- **Search:** Find findings by title, service, resource, or identifier.
- **Severity filtering:** Filter findings by Critical, High, Medium, or Low severity.
- **Status filtering:** View Open, In Progress, or Resolved findings.
- **Remediation tracking:** Change a finding's status and see the dashboard metrics update.
- **Browser persistence:** Save status changes using browser local storage.
- **CSV export:** Download findings for offline review and reporting.
- **Responsive layout:** Dashboard styling adapts to smaller screens.

## Sample Security Scenarios:
The demonstration data includes examples involving:
- Public object storage access
- Excessively broad administrative permissions
- Unrestricted SSH access
- Missing cloud audit logging
- Encryption configuration reviews
- Missing multi-factor authentication
- Database backup retention
- Incomplete resource tagging

These are illustrative scenarios, not verified vulnerabilities in real cloud resources.

## Technology Stack:
- HTML5
- CSS3
- Vanilla JavaScript
- Browser local storage
- CSV file generation using JavaScript

No framework or backend server is required for the current prototype.

## Run Locally:
1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Search for findings, apply filters, change statuses, and test CSV export.

Status persistence depends on the browser's local storage for the page's origin.

## Validation Checklist:
- [ ] Dashboard displays all eight demonstration findings.
- [ ] Critical and High severity filters return the expected findings.
- [ ] Search finds matching titles, services, resources, and IDs.
- [ ] Status changes update summary metrics.
- [ ] Status changes persist after refreshing the page.
- [ ] CSV export downloads a findings report.
- [ ] Layout remains usable on a smaller screen.

## Security and Data Handling:
This is a front-end portfolio prototype using static sample data. It does not authenticate users, connect to cloud APIs, enforce access control, or provide production-grade security monitoring.
Do not enter credentials, access keys, confidential information, or real sensitive cloud data into this demonstration.

## Roadmap:
Potential future enhancements:
- Integrate authorized AWS security data sources.
- Add a backend API and database.
- Map findings to recognized security standards.
- Add authentication and role-based access controls.
- Introduce severity trends, remediation deadlines, and audit history.
- Add automated testing and deployment workflows.
  

## Project Purpose:
CloudGuard demonstrates foundational skills in cloud security concepts, front-end development, finding triage, security reporting, and technical documentation.

Built as a cloud security portfolio project.
