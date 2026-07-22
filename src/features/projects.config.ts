import type { PaginatedResponse, Project } from "@/types";

export interface PortfolioProject extends Project {
  slug: string;
  type: string;
  summary: string;
  technologies: string[];
  content: string;
  featured: boolean;
  showInProjects?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "master-data-management-system",
    title: "Master Data Management System",
    type: "Production Web Application",
    technologies: [
      "Next.js",
      "Node.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Azure",
    ],
    summary:
      "Developed a Sri Lanka-specific MDM workflow application that digitalized master data request submission, approval, SCM review, MDM processing, documentation, audit history, and finalization.",
    description:
      "A production MDM workflow system for a Sri Lankan operation that replaced Excel and email-based request handling with structured validation, approvals, traceability, and controlled finalization.",
    image: "/projects/Sri Lanka Master Data Management System.png",
    demoVideos: [
      {
        provider: "youtube",
        title: "Master Data Management System demo video",
        videoId: "U2KIq_BYp7Y",
        sectionTitle: "Project Demo",
      },
    ],
    content: `## About

The Sri Lanka Master Data Management System was a production web application developed specifically for a Sri Lankan operation. It digitalized the local process for requesting, reviewing, approving, and finalizing master data changes used within CargoWise.

The system supported both new master data creation and updates to existing master data, replacing a heavily manual process based on Excel files, email communication, and repeated follow-ups. It was designed around Sri Lanka-specific organizations, departments, approval responsibilities, validation requirements, and operational procedures.

This solution was intentionally built for the local operating model and did not support the configurable, multi-country requirements of the current Global MDM platform.

## Objective

The project aimed to establish a controlled and traceable process for managing master data requests across the Sri Lankan operation.

The main objectives were to:

- Reduce dependence on Excel-based request handling and email coordination.
- Standardize the information collected for master data creation and modification.
- Route requests through the correct Sri Lanka-specific approval workflow.
- Prevent incomplete or incorrectly approved requests from reaching the MDM team.
- Centralize supporting documents, comments, and operational communication.
- Provide clear visibility into the status and ownership of every request.
- Maintain an auditable record of submissions, approvals, returns, rejections, and finalization activities.

## Solution

I designed and developed a centralized, workflow-based MDM application that managed the complete request lifecycle, from initial submission through business approval, SCM review, MDM processing, and finalization.

The application provided structured forms with conditional validation based on the request type, account group, organization, country, and business requirements. Requests were automatically directed to the appropriate approvers according to the local operating rules.

Where SCM approval was required for a request, the workflow prevented the request from bypassing SCM and reaching MDM without the necessary review.

The solution included:

- Role-based access and workflow controls.
- Separate handling for new and update requests.
- Conditional field requirements and validation.
- Business, Director, Approver, SCM, and MDM review stages.
- Supporting-document upload and management.
- Request comments and return-for-correction functionality.
- Email and in-system notifications.
- Complete status and approval history.
- Audit logging for important user and workflow actions.
- MDM processing and controlled request finalization.
- Administrative user and approval-assignment management.

The system was built using Next.js, React, TypeScript, Prisma, PostgreSQL, Docker, and Microsoft Azure.

## Summary

The Sri Lanka MDM System transformed a fragmented local master data process into a structured digital workflow.

Before the application, request details, supporting files, approvals, and operational updates were distributed across spreadsheets and email conversations. This made it difficult to track responsibility, identify pending actions, and maintain a reliable history of decisions.

The implemented system created one controlled platform where users could submit requests, approvers could review the relevant information, SCM could complete required operational checks, and the MDM team could process and finalize approved records.

Although the system was highly effective for the local operation, its workflow, configuration, and business rules were closely aligned with Sri Lanka-specific requirements. The experience and operational knowledge gained from this project later provided a strong foundation for planning the current Global MDM platform.

## Key Work

- Analysed the existing Sri Lanka master data process and translated the operational steps into a digital workflow.
- Designed and developed the complete production web application.
- Created structured forms for new master data creation and existing master data updates.
- Implemented field-level validation and conditional requirements based on request details.
- Developed Sri Lanka-specific approval-routing logic for Director, Approver, SCM, and MDM review.
- Added controls to prevent requests from bypassing mandatory approval stages.
- Implemented role-based access for Requesters, Approvers, SCM, MDM, and Administrators.
- Built request status tracking from draft and submission through approval, return, rejection, processing, and finalization.
- Added supporting-document upload, download, and request-level document management.
- Implemented comments and correction workflows so approvers could return incomplete requests to users.
- Developed notification handling for submissions, approvals, returns, and MDM actions.
- Added audit logs and approval histories to provide traceability for each request.
- Built administrative functionality for managing users, roles, and approval assignments.
- Supported the deployment and production operation of the application using PostgreSQL, Docker, and Azure.
- Prepared the system structure and operational controls required for adoption by local teams.
- Produced a project demonstration video presenting the complete end-to-end automation process.

## Business Value

**Reduced manual coordination:** The system reduced the need to exchange Excel files, search through email threads, and manually follow up with multiple departments.

**Improved data quality:** Structured fields, predefined options, and conditional validation helped ensure that requests reached approvers and MDM users with complete and consistent information.

**Faster request processing:** Automated routing and clear ownership reduced delays caused by uncertainty about who needed to review or process a request.

**Stronger process control:** Mandatory workflow stages ensured that the required business and SCM approvals were completed before requests reached MDM.

**Greater visibility:** Users and approvers could see the current request status, pending action, comments, and previous decisions from one application.

**Better accountability:** Approval histories, timestamps, and audit logs created a clear record of who submitted, reviewed, returned, approved, and finalized each request.

**Centralized documentation:** Supporting documents were stored against the relevant request instead of being distributed across separate emails and local folders.

**Reduced operational risk:** The system minimized incomplete submissions, approval bypasses, inconsistent request formats, and uncontrolled master data changes.

**Foundation for future transformation:** The project demonstrated the value of workflow-based master data governance within a local operation and provided practical experience that informed the design of the later Global MDM initiative.`,
    date: "2026",
    likes: 0,
    featured: true,
  },
  {
    id: 2,
    slug: "cattlesite-integrated-veterinary-application",
    title: "CattleSite - Integrated Veterinary Application",
    type: "Final Year Research Project / IoT & Machine Learning-Based Web Application",
    technologies: [
      "React",
      "Python",
      "TensorFlow",
      "Fast api",
      "Firebase Realtime Database",
      "Arduino",
      "NodeMCU ESP8266",
      "MAX30102",
      "LM35",
    ],
    summary:
      "Developed a university research prototype integrating IoT, RFID, Firebase, machine learning, and a React dashboard to improve dairy-cattle health monitoring, nutrition planning, and care reminders.",
    description:
      "An integrated veterinary research platform focused on cow health monitoring, predictive analytics, nutrition recommendations, medical records, alerts, and farmer decision support.",
    image: "/projects/CattleSite - Integrated Veterinary Application.jpg",
    galleryImages: [
      {
        id: 1,
        src: "/certifications/SMARTGENCON 2025 Publication.jpg",
        alt: "SMARTGENCON 2025 publication certificate for the CattleSite research paper",
      },
      {
        id: 2,
        src: "/projects/RP-Group.jpg",
        alt: "CattleSite research project group at SMARTGENCON 2025",
      },
      {
        id: 3,
        src: "/projects/Paper ID.png",
        alt: "SMARTGENCON 2025 Paper ID 1849 for the CattleSite research paper",
      },
      {
        id: 4,
        src: "/projects/IOT.jpg",
        alt: "Demo Device for CattleSite IoT-based cow health monitoring",
      },
    ],
    downloadablePdf: {
      href: "/projects/SMARTGENCON2025-ABSTRACT BOOK.pdf",
      label: "Download PDF",
      fileName: "SMARTGENCON2025-ABSTRACT BOOK.pdf",
    },
    demoVideos: [
      {
        provider: "youtube",
        title: "CattleSite IoT device demo video",
        videoId: "ODbM-3Yj3Nc",
        sectionTitle: "IoT Device Demo",
        eyebrow: "Device Demo",
        aspectRatio: "9 / 16",
      },
      {
        provider: "youtube",
        title: "CattleSite - Integrated Veterinary Application demo video",
        videoId: "5Ze4Z84HoG4",
        sectionTitle: "Project Demo",
      },
    ],
    content: `## About

CattleSite - Integrated Veterinary Application was developed as my university research project at the Sri Lanka Institute of Information Technology (SLIIT). The project explored how IoT, machine learning, and centralized cloud technologies could improve dairy-cattle health management and modernize traditional farming practices.

CattleSite was designed as an integrated platform for farmers and veterinarians, combining real-time health monitoring, predictive analytics, nutrition management, medical records, automated reminders, and access to veterinary services.

Within the group research project, my primary research component was Enhance Cow Care Practices. This component focused on monitoring individual cows, predicting health risks, generating personalized nutrition recommendations, and automating essential care activities such as vaccinations, feeding schedules, and veterinary check-ups.

The complete CattleSite research was presented under Paper ID 1849 at the 2025 International Conference on Smart Generation Communication, Computing and Networking - SMARTGENCON 2025.

## Objective

The objective of the project was to address the limitations of traditional cattle-care practices, where health records, nutrition plans, monitoring activities, and veterinary follow-ups were often handled manually and through disconnected processes.

My component specifically aimed to:

- Continuously monitor key cow-health measurements.
- Consolidate health, nutrition, and medical information into a centralized system.
- Identify potential health risks before they developed into critical conditions.
- Generate care and nutrition recommendations for individual cows.
- Reduce dependence on manual observation and record-keeping.
- Automate routine reminders for vaccinations, feeding, and veterinary examinations.
- Provide farmers with accessible, data-driven information for faster decision-making.

The research sought to move cattle management from a reactive model toward a proactive and personalized approach.

## Solution

I contributed to the design and development of an integrated cow-care management component combining IoT sensors, RFID identification, machine learning, Firebase cloud storage, and a React-based user interface.

IoT-enabled devices collected real-time physiological measurements such as:

- Body temperature.
- Heart rate.
- SpO2 or blood-oxygen saturation.

RFID technology associated the collected readings with the correct cow profile. Farmers could also record breed, body-condition score, daily milk production, treatment history, vaccination details, feeding schedules, and behavioural observations. All automated and manually entered information was synchronized through a centralized Firebase database.

A Random Forest Classifier analysed historical records and real-time sensor readings to identify potential health risks, nutritional requirements, and productivity-related outcomes. The prediction results were converted into understandable insights and displayed through the farmer dashboard.

The solution also included personalized nutrition planning, feed-intake monitoring, and an automated notification system for vaccinations, health checks, feeding schedules, and abnormal health measurements.

## Summary

CattleSite demonstrated how intelligent technologies could be integrated into a practical veterinary and livestock-management platform.

The wider research solution covered cattle disease detection, health monitoring, milk-production forecasting, and communication between farmers and veterinary professionals. My contribution concentrated on the Enhance Cow Care Practices component, which connected sensor-based monitoring, centralized records, predictive health analysis, personalized nutrition, and automated care reminders.

The research prototype provided farmers with a clearer view of each cow's current health condition and historical trends, while helping them identify risks and respond earlier. It also demonstrated the potential of precision agriculture to improve animal welfare, operational efficiency, and farm productivity.

## Key Work

- Researched the operational challenges associated with traditional cow-health and nutrition management.
- Gathered domain knowledge related to cattle health measurements, body-condition scoring, feeding requirements, and veterinary-care processes.
- Designed the architecture for the Enhance Cow Care Practices research component.
- Integrated IoT sensors for collecting body temperature, heart rate, and SpO2 readings.
- Used RFID-based identification to associate readings with individual cow profiles.
- Developed centralized management of health, medical, nutrition, and vaccination records using Firebase.
- Combined real-time sensor readings with farmer-entered historical information.
- Prepared, cleaned, normalized, and validated datasets for machine-learning analysis.
- Developed and evaluated a Random Forest classification model for predicting cow-health risks and nutritional requirements.
- Implemented personalized nutrition recommendations using factors such as age, weight, breed, health measurements, and lactation status.
- Added feed-monitoring functionality to identify differences between planned and actual intake.
- Implemented automated reminders for vaccinations, feeding schedules, and veterinary check-ups.
- Added critical alerts for abnormal body temperature, heart rate, and SpO2 readings.
- Contributed to the React-based dashboard for presenting health trends, predictions, alerts, and actionable recommendations.
- Conducted model evaluation using accuracy, precision, recall, F1-score, and cross-validation techniques.
- Compared IoT sensor readings against veterinary assessments during system evaluation.
- Participated in integration testing, usability evaluation, and iterative improvement of the research prototype.
- Contributed to the final CattleSite research paper presented as Paper ID 1849 at SMARTGENCON 2025.

## Business Value

**Earlier identification of health risks:** Continuous sensor monitoring and predictive analysis can help farmers identify possible health problems before they become severe, supporting faster veterinary intervention.

**Reduced manual monitoring:** Automated collection of vital measurements reduces the time farmers need to spend repeatedly observing and recording the condition of each cow.

**Improved animal welfare:** Personalized care recommendations, health alerts, and timely medical reminders support more consistent and proactive treatment.

**Better nutrition management:** Cow-specific nutrition recommendations help replace generalized feeding practices with plans based on individual health, age, breed, weight, and lactation requirements.

**Centralized and reliable records:** Health measurements, treatments, vaccination schedules, feeding information, and historical records are maintained in one connected system rather than fragmented paper or manual records.

**Data-driven decision-making:** The dashboard converts technical sensor readings and machine-learning predictions into understandable information that farmers can use when making daily care decisions.

**Reduced risk of missed activities:** Automated reminders reduce the likelihood of overlooked vaccinations, feeding schedules, and routine veterinary examinations.

**Greater farm efficiency:** The combination of real-time monitoring, predictive analytics, and automation can reduce repetitive work, improve response times, and support more efficient use of farm resources.

**Research and innovation value:** The project demonstrated the practical application of IoT, cloud computing, and machine learning within livestock management and provided a foundation for further development in precision agriculture and intelligent veterinary systems.

The research evaluation reported 72.5% model accuracy and an average 74.3% alignment between IoT sensor readings and veterinary assessments, demonstrating the technical potential of the proposed component within the tested research environment.`,
    date: "2025",
    likes: 0,
    featured: true,
  },
  {
    id: 3,
    slug: "lunch-booking-app",
    title: "Lunch Booking App",
    type: "Power Platform / Process Automation",
    technologies: [
      "Microsoft Power Apps",
      "Power Automate",
      "Microsoft 365",
      "Outlook Email",
    ],
    summary:
      "Built a Power App that allows employees to reserve lunch only when needed, calculates the daily booking count, and sends the final meal count to the kitchen.",
    description:
      "A lunch reservation Power App that improves daily meal count accuracy and helps reduce food wastage.",
    image: "/projects/Efl Lunch Booking Power App.png",
    content: `## About

Lunch Booking App is a Power App introduced to improve the daily lunch reservation process. Lunch reservations were previously managed using a fixed number of employees in each department, but those counts could change and had to be communicated manually to the kitchen.

## Objective

Reduce food wastage by allowing employees to reserve lunch only when needed and by providing the kitchen with an accurate daily booking count.

## Solution

Built a Power App that lets employees submit lunch reservations, calculates the total daily booking count, and automatically sends the final meal count to the kitchen via email.

## Summary

The application replaces manual department count updates with an employee-driven booking process that captures only the meals actually required for the day.

## Key Work

- Built a Power App for employee lunch reservations.
- Calculated the total number of daily lunch bookings from submitted reservations.
- Automated the final lunch count email sent to the kitchen.
- Replaced manual department count updates with a more accurate booking-based process.

## Business Value

The application helps reduce food wastage, improves meal count accuracy, and gives the kitchen a clearer daily count for lunch preparation.`,
    date: "2026",
    likes: 0,
    featured: true,
  },
  {
    id: 4,
    slug: "arrival-notice-extraction-validation-automation",
    title: "Arrival Notice Extraction and Validation Automation",
    type: "Business Process Automation",
    technologies: [
      "Python",
      "Excel",
      "Outlook COM",
      "PDF/Text Extraction",
      "SMTP",
    ],
    summary:
      "Automated extraction and validation of shipment details from emails and attachments, generating structured reports and exception alerts.",
    description:
      "A Python automation workflow for extracting shipment information, validating data, producing reports, and sending exception alerts.",
    content: `## About

Arrival Notice Extraction and Validation Automation is a business process automation workflow for processing shipment details from emails and attachments.

## Objective

Reduce manual email review, improve validation consistency, and help operations teams identify shipment data exceptions faster.

## Solution

Built a Python automation using Outlook COM, PDF and text extraction, validation logic, structured report generation, and SMTP alerts for exception handling.

## Summary

This automation extracts and validates shipment details from emails and attachments, then generates structured reports and exception alerts for operational follow-up.

## Key Work

- Used Python and Outlook COM to process email-based inputs.
- Extracted shipment data from PDF and text attachments.
- Validated extracted details against expected operational data.
- Generated structured reports and SMTP-based exception alerts.

## Business Value

The workflow reduces manual email checking, improves validation consistency, and helps teams respond faster to shipment data exceptions.`,
    date: "2025",
    likes: 0,
    featured: false,
    showInProjects: false,
  },
  {
    id: 5,
    slug: "cargowise-document-upload-automation",
    title: "CargoWise Document Upload Automation",
    type: "ERP / Document Workflow Automation",
    technologies: [
      "Python",
      "Excel Config",
      "SMTP",
      "OneDrive",
      "CargoWise eDocManager",
    ],
    summary:
      "Built an automated document processing workflow for routing shipment documents to CargoWise eDocManager with logging and standardized handling.",
    description:
      "An ERP document workflow automation for standardized routing, logging, and CargoWise eDocManager upload handling.",
    content: `## About

CargoWise Document Upload Automation is an ERP document workflow automation for routing shipment documents into CargoWise eDocManager with standardized handling.

## Objective

Reduce repetitive document upload effort, improve routing consistency, and strengthen traceability for shipment document processing.

## Solution

Built a Python-based workflow using Excel configuration, OneDrive folders, CargoWise eDocManager handling, logging, and SMTP notifications to automate document routing.

## Summary

This workflow automates shipment document routing into CargoWise eDocManager using configurable Excel inputs, OneDrive-based document handling, logging, and alerting.

## Key Work

- Built a Python-based document processing workflow.
- Used Excel configuration to standardize document routing rules.
- Integrated OneDrive folders and CargoWise eDocManager handling.
- Added logging and SMTP notifications for traceability.

## Business Value

The automation improves document handling consistency, reduces repetitive upload effort, and strengthens operational traceability.`,
    date: "2025",
    likes: 0,
    featured: false,
    showInProjects: false,
  },
  {
    id: 6,
    slug: "bond-hbl-copy-rename-automation",
    title: "BOND HBL Copy and Rename Automation",
    type: "File Processing / Logistics Automation",
    technologies: ["Python", "n8n", "Excel", "OneDrive", "SMTP"],
    summary:
      "Automated matching, copying, and renaming of HBL PDF documents using shipment and HBL data from Excel files.",
    description:
      "A logistics file-processing automation for matching, copying, and renaming HBL PDF documents from structured Excel data.",
    content: `## About

BOND HBL Copy and Rename Automation is a logistics file-processing automation for matching, copying, and renaming HBL PDF documents from structured shipment data.

## Objective

Reduce manual file handling time, lower naming errors, and improve consistency when preparing HBL documents for operational use.

## Solution

Built an automation workflow using Python, n8n, Excel, OneDrive, and SMTP to match shipment and HBL records, locate the related PDF files, then copy and rename them through a standardized process.

## Summary

This automation matches shipment and HBL records from Excel files, then copies and renames corresponding HBL PDF documents through a standardized workflow.

## Key Work

- Matched shipment and HBL data from Excel inputs.
- Automated file copy and rename operations for HBL PDFs.
- Used Python and n8n to coordinate workflow steps.
- Added OneDrive and SMTP handling for file movement and alerts.

## Business Value

The workflow reduces manual file handling time, lowers naming errors, and improves consistency for document preparation tasks.`,
    date: "2025",
    likes: 0,
    featured: false,
    showInProjects: false,
  },
  {
    id: 7,
    slug: "logistics-job-creation-automation",
    title: "Logistics Job Creation Automation",
    type: "Desktop Logistics Automation",
    technologies: [
      "Desktop Application",
      "Excel VBA",
      "XML",
      "CargoWise",
      "Outlook Email",
    ],
    summary:
      "Developed a desktop-based logistics automation workflow that streamlines CargoWise job creation for customer-specific ocean export shipments using structured Excel input, XML generation, automated processing, and Outlook confirmations.",
    description:
      "A controlled ocean-export shipment job-creation automation that validates booking data, generates CargoWise-compatible XML files, prevents incomplete or duplicate submissions, and sends confirmation emails.",
    image: "/projects/Michelin Job Automation.png",
    content: `## About

Logistics Job Creation Automation is a desktop-based solution developed to streamline CargoWise job creation for customer-specific ocean export shipments. The solution combines a macro-enabled Excel feeder template, a custom desktop processing application, XML generation, CargoWise integration, and Outlook-based confirmation emails into one controlled workflow.

Users enter shipment and booking information into the structured Excel template, validate the required fields, and initiate processing through the desktop application. The application converts completed booking records into the required XML structure and sends them to CargoWise for automated job creation.

## Objective

The objective of the project was to reduce the time, effort, and operational risk associated with manually creating customer shipment jobs in CargoWise.

The automation was designed to:

- Standardize shipment data entry.
- Validate mandatory booking information before submission.
- Automatically generate CargoWise-compatible XML files.
- Prevent incomplete and duplicate submissions.
- Provide users with clear processing results and confirmation emails.
- Improve the accuracy, speed, and traceability of the overall job-creation process.

## Solution

I developed a structured automation workflow using two primary components.

The Excel feeder template acts as the controlled data-entry and validation layer. It provides searchable dropdowns, predefined customer-specific values, mandatory-field validation, and booking-status indicators. Records are marked as Completed only when the required data has been entered correctly. Incomplete records remain blocked from XML submission until the identified issues are corrected.

The desktop processing application acts as the processing and integration layer. It receives the selected workbook, generates the required XML files, and sends them to CargoWise. After processing, the application displays a summary showing the number of shipments detected, successfully processed, and not completed.

The workflow also includes Outlook-based submission verification, CargoWise job-creation confirmations, and XML attachments for operational reference.

## Summary

The solution transformed a repetitive manual CargoWise job-creation process into a controlled, validated, and traceable automation workflow.

It guides users from booking-data preparation through XML generation, CargoWise submission, and confirmation. It includes safeguards for incomplete records, duplicate submissions, and incorrect template usage while maintaining a practical interface for operational users.

I also created a project demonstration video to explain the complete workflow and demonstrate how shipment data is validated, processed, and submitted to CargoWise.

## Key Work

- Designed and developed a desktop application for processing customer shipment records.
- Created a macro-enabled Excel template for structured booking-data entry.
- Implemented mandatory-field validation and Completed / Not Completed booking-status indicators.
- Added searchable dropdowns and automatic code mapping for carriers, consignees, destinations, job operators, movement types, and other CargoWise fields.
- Configured customer-specific default values to reduce repeated manual data entry.
- Developed the conversion of booking data into CargoWise-compatible XML files.
- Implemented shipment-processing summaries showing detected, completed, and incomplete records.
- Added duplicate-submission controls to prevent the same processed workbook from being submitted more than once.
- Integrated Outlook-based XML delivery, summary reporting, and CargoWise confirmation emails.
- Supported both new job creation and the reuse of an existing CargoWise job through an optional HBL workflow.
- Prepared a complete user SOP covering data entry, validation, submission, verification, and troubleshooting.
- Produced a project demonstration video presenting the complete end-to-end automation process.

## Business Value

**Reduced manual effort:** The automation removes the need to manually recreate complete customer shipment records directly inside CargoWise.

**Improved data accuracy:** Mandatory-field validation, controlled dropdowns, and predefined values reduce typing errors, missing information, and incorrect CargoWise codes.

**Faster job creation:** Multiple shipment records can be prepared in the Excel template and processed through a consistent XML-based workflow.

**Lower operational risk:** Incomplete records are blocked from submission, while duplicate-submission controls reduce the risk of creating redundant jobs.

**Standardized operations:** Users follow the same structured process for data entry, validation, XML generation, and CargoWise submission.

**Improved traceability:** Processing summaries, Sent Items verification, CargoWise confirmation emails, and XML attachments provide clear evidence of each submission.

**Better user adoption:** The Excel-based entry method, visual validation indicators, user SOP, and demonstration video make the solution easier for operational teams to understand and use.`,
    date: "2025",
    likes: 0,
    featured: false,
  },
];

export const featuredPortfolioProjects = portfolioProjects.filter(
  (project) => project.featured,
);

const listedPortfolioProjects = portfolioProjects.filter(
  (project) => project.showInProjects !== false,
);

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function searchPortfolioProjects(query: string) {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    return listedPortfolioProjects;
  }

  return listedPortfolioProjects.filter((project) => {
    const searchable = [
      project.title,
      project.type,
      project.summary,
      project.description,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(searchTerm);
  });
}

export function paginatePortfolioProjects(
  projects: PortfolioProject[],
  page: number,
  limit: number,
): PaginatedResponse<PortfolioProject> {
  const total = projects.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const startIndex = (page - 1) * limit;

  return {
    data: projects.slice(startIndex, startIndex + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}