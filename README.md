# HireHub

**A recruitment platform team project  
including authentication, payment, AI, and deployment  
(Backend / Infrastructure Responsibility)**

🔗 **Service**: https://byeongarigaebaldan.store/  
🔗 **GitHub**: https://github.com/kumanamu/HireHubs

[日本語版はこちら](README.ja.md)

---

## 1. Project Overview

HireHub is a web-based recruitment platform that connects job seekers and companies.
It is a team project that includes job posting management, user authentication,
payment-based services, and AI-powered analysis features.

This project was developed in a team environment.
I was responsible for the design, implementation, deployment,
and operation of core backend and infrastructure components.

---

## 2. My Role & Responsibility

This section summarizes the areas I was directly responsible for within the team project.

- Design and implementation of authentication and security systems  
- Design of payment and token-based service architecture  
- Configuration of Docker-based deployment environments and CI/CD pipelines  
- Integration of AI analysis APIs and handling of streaming responses  
- Implementation of map and location-based features  
- Partial frontend integration and API-related debugging  
- Analysis and stabilization of issues in the deployment environment  

---

## 3. Key Contributions (Core Features)

### Authentication & Security

- Designed and implemented a JWT-based authentication architecture  
- Implemented Google, Kakao, and Naver social login integrations  
- Configured authorization policies and CORS settings using Spring Security  
- Managed token issuance, validation, and expiration flows separately  

---

### Payment & Token System

- Integrated the PortOne (KG Inicis) payment module  
- Designed payment flows separating test and production environments  
- Implemented token packages, payment history, and status management logic  
- Analyzed and resolved payment success and data inconsistency issues  

---

### AI Analysis API

- Integrated a FastAPI-based AI analysis server  
- Processed streaming responses using Server-Sent Events (SSE)  
- Designed separate Basic and Premium analysis flows  
- Structured response data to support multilingual toggles  

---

### Map & Location Feature

- Integrated the Kakao Map API  
- Implemented automatic latitude and longitude storage on address input  
- Resolved issues related to API key and domain authentication  
- Designed entity structures with future location feature expansion in mind  

---

## 4. Problems & Debugging

During development and deployment, I directly analyzed and resolved the following issues:

- Root cause analysis and resolution of 401 errors caused by missing authentication tokens  
- Fixing frontend request blocking due to missing CORS configurations  
- Correcting path configuration errors in Docker and Nginx environments  
- Analysis of 404 and 401 errors during SSE connections  
- Resolving deployment issues caused by missing environment variables  
- Fixing frontend rendering errors caused by DTO changes  

When issues occurred, I followed a log-based approach,
focusing on reproducibility and structural fixes rather than temporary workarounds.

---

## 5. Deployment & Operation

- Configured service environments using Docker and Docker Compose  
- Operated backend, frontend, and AI servers as separate containers  
- Built CI/CD pipelines using GitHub Actions  
- Configured deployment environments using EC2 and Nginx  
- Managed environment variables separately using `.env.prod`  
- Monitored logs and responded to errors after deployment  

---

## 6. Lessons Learned & Future Improvements

### Lessons Learned

- Clear ownership of responsibility is essential, even in team projects  
- System design must account for differences between local and production environments  
- Authentication, payment, and AI features require exception-first design  
- Clear communication is critical when changing frontend–backend interfaces  

### Future Improvements

- Advanced authentication and authorization structures  
- Improved exception handling and logging for the payment system  
- Performance optimization of AI analysis responses  
- Introduction of monitoring and notification systems  

---

## Closing

Through the HireHub project, I gained comprehensive experience
in backend development, deployment environment configuration,
service operation, and debugging.

Although this was a team project,
treating each feature as an independent service
and developing it with clear responsibility
has become one of my strongest professional strengths.
