# 🏢 VIVN HRM (StaffSphere)

<p align="center">
  <img src="logo.png" alt="StaffSphere Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Hệ thống Quản lý Nhân sự và Tính lương theo quy định Việt Nam</strong>
</p>

<p align="center">
  <em>Vietnamese Human Resource Management & Payroll System</em>
</p>

---

## 📋 Giới thiệu | Introduction

**VIVN HRM** (StaffSphere) là một ứng dụng quản lý nhân sự toàn diện được thiết kế dành riêng cho doanh nghiệp Việt Nam. Hệ thống tích hợp đầy đủ các tính năng từ quản lý thông tin nhân viên, tính lương theo quy định thuế Việt Nam, đến xử lý các biểu mẫu công tác và quản lý dự án.

*VIVN HRM (StaffSphere) is a comprehensive HR management application designed specifically for Vietnamese enterprises. The system integrates features from employee information management, salary calculation according to Vietnamese tax regulations, to processing business travel forms and project management.*

---

## ✨ Tính năng chính | Key Features

### 👥 **Quản lý Nhân viên | Employee Management**
- Dashboard tổng quan nhân viên với bộ lọc và tìm kiếm
- Quản lý CRUD thông tin nhân viên đầy đủ
- Import/Export dữ liệu nhân viên từ Excel
- Xem chi tiết hồ sơ từng nhân viên
- Phân loại theo phòng ban, vị trí, trạng thái công tác

### 💰 **Tính lương & Thuế | Payroll & Tax Calculator**
- Tính lương tự động theo quy định thuế Việt Nam 2024
- Hỗ trợ 7 bậc thuế thu nhập cá nhân (PIT)
- Tính bảo hiểm xã hội (BHXH) cho cả công ty và nhân viên
- Tính tiền làm thêm giờ (OT 1.5x, 2.0x, 3.0x)
- Giảm trừ người phụ thuộc
- Xuất bảng lương Excel và phiếu lương (Payslip)
- Gửi phiếu lương qua email

### 📝 **Biểu mẫu Công tác | Travel Forms**
- **F21**: Tờ khai đề nghị tạm ứng công tác phí
- **F22**: Tờ khai thanh toán tạm ứng
- **F23**: Báo cáo tổng hợp chi phí công tác
- Tự động điền thông tin từ hồ sơ nhân viên
- Xuất file Word (.docx) theo mẫu chuẩn
- Hỗ trợ in trực tiếp

### 🔍 **Xử lý Biên lai | Payment Voucher Processing**
- Trích xuất thông tin từ PDF biên lai thanh toán
- Xử lý hình ảnh biên lai bằng AI (OpenAI/Anthropic)
- Phân loại chi phí tự động
- Tạo báo cáo tổng hợp chi phí theo nhân viên

### 📊 **Biểu mẫu Kiểm tra | Inspection Forms**
- **F32**: Biểu mẫu kiểm tra thiết bị
- **F60**: Biểu mẫu báo cáo kiểm tra
- Trích xuất dữ liệu từ PDF
- Xuất file Word theo mẫu chuẩn

### 💵 **Sổ Quỹ | Cash Book**
- Quản lý thu chi tiền mặt
- Theo dõi số dư đầu kỳ/cuối kỳ
- Xuất báo cáo Excel

### 📈 **Quản lý Dự án | Project Management**
- Bảng Kanban quản lý task với drag & drop
- Gantt Chart theo dõi tiến độ dự án
- Timeline team - xem lịch làm việc của nhân viên
- Dashboard workload đánh giá khối lượng công việc
- Quản lý projects với trạng thái (Planning, In Progress, Completed, On Hold)
- Phân công task cho team members
- Theo dõi deadline và priority (Low, Medium, High, Critical)
- Thống kê tiến độ dự án theo biểu đồ

### 🔐 **Xác thực | Authentication**
- Đăng nhập/Đăng ký tài khoản
- Khôi phục mật khẩu
- Phân quyền người dùng

---

## 🛠️ Công nghệ | Tech Stack

### Backend
| Công nghệ | Mô tả |
|-----------|-------|
| **FastAPI** | Web framework hiệu suất cao cho Python |
| **Uvicorn** | ASGI server |
| **Pydantic** | Data validation |
| **Pandas** | Xử lý dữ liệu Excel |
| **OpenPyXL** | Đọc/ghi file Excel |
| **python-docx** | Tạo file Word |
| **OpenAI/Anthropic** | AI cho OCR biên lai |
| **Pillow** | Xử lý hình ảnh |

### Frontend
| Công nghệ | Mô tả |
|-----------|-------|
| **React 18** | UI Library |
| **TypeScript** | Type-safe JavaScript |
| **Material UI 5** | Component library |
| **Tailwind CSS** | Utility CSS framework |
| **Radix UI** | Accessible components |
| **React Query** | Server state management |
| **React Router** | Client-side routing |
| **Recharts** | Charts & visualization |
| **Framer Motion** | Animations |
| **Vite** | Build tool |

---

## 📁 Cấu trúc thư mục | Project Structure

```
VIVN_HRM/
├── backend/                    # Backend FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   └── routes.py      # API endpoints
│   │   ├── models/
│   │   │   └── schemas.py     # Pydantic models
│   │   ├── services/          # Business logic
│   │   │   ├── calculator.py  # Salary calculator
│   │   │   ├── employee_service.py
│   │   │   ├── payroll_service.py
│   │   │   ├── travel_form_service/
│   │   │   ├── inspection_form_service/
│   │   │   ├── payment_voucher_service/
│   │   │   ├── cash_book_service.py
│   │   │   └── email/
│   │   ├── storage/           # JSON data storage
│   │   └── main.py           # FastAPI app
│   ├── templates/            # Document templates
│   └── run.py               # Entry point
│
├── frontend/                  # Frontend React
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── pages/       # Page components
│   │   │   ├── ui/          # UI components (shadcn)
│   │   │   └── hooks/       # Custom hooks
│   │   ├── App.tsx          # Main app
│   │   └── index.tsx        # Entry point
│   ├── public/              # Static assets
│   └── package.json
│
├── requirements.txt          # Python dependencies
├── start_app.bat            # Windows startup script
└── README.md
```

---

## 🚀 Cài đặt & Khởi chạy | Installation & Setup

### Yêu cầu hệ thống | Requirements
- **Python** 3.10+
- **Node.js** 18+
- **npm** hoặc **yarn**

### Cài đặt nhanh (Windows) | Quick Setup (Windows)

```bash
# Chạy script tự động
start_app.bat
```

Script sẽ tự động:
1. Cài đặt Python dependencies
2. Cài đặt npm dependencies
3. Khởi động Backend server
4. Khởi động Frontend server
5. Mở trình duyệt

### Cài đặt thủ công | Manual Setup

#### 1. Clone repository
```bash
git clone <repository-url>
cd VIVN_HRM
```

#### 2. Cài đặt Backend
```bash
# Tạo virtual environment (khuyến nghị)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Cài đặt dependencies
pip install -r requirements.txt
```

#### 3. Cài đặt Frontend
```bash
cd frontend
npm install
cd ..
```

#### 4. Cấu hình môi trường | Environment Configuration
Tạo file `.env` trong thư mục `backend/` (tùy chọn):
```env
# Server
PORT=3200
NODE_ENV=development

# AI Services (cho Payment Voucher OCR)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Email (cho gửi Payslip)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

#### 5. Khởi chạy | Start Application

**Terminal 1 - Backend:**
```bash
cd backend
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 🌐 Truy cập ứng dụng | Access Application

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:2120 |
| **Backend API** | http://localhost:3200 |
| **API Documentation** | http://localhost:3200/docs |
| **Alternative Docs** | http://localhost:3200/redoc |

---

## 📊 API Endpoints chính | Main API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/recover-password` | Khôi phục mật khẩu |

### Employees
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/employees` | Danh sách nhân viên |
| GET | `/api/employees/{id}` | Chi tiết nhân viên |
| POST | `/api/employees` | Thêm nhân viên |
| PUT | `/api/employees/{id}` | Cập nhật nhân viên |
| DELETE | `/api/employees/{id}` | Xóa nhân viên |

### Payroll
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/salary/calculate` | Tính lương |
| GET | `/api/payroll/employees` | DS nhân viên payroll |
| POST | `/api/payslip/download-excel` | Xuất payslip Excel |
| POST | `/api/payslip/send-emails` | Gửi payslip email |

### Travel Forms
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/travel-form/generate-f21` | Tạo form F21 |
| POST | `/api/travel-form/generate-f22` | Tạo form F22 |
| POST | `/api/travel-form/generate` | Tạo form F23 |

### Cash Book
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/cashbook` | Lấy dữ liệu sổ quỹ |
| PUT | `/api/cashbook` | Cập nhật sổ quỹ |
| POST | `/api/cashbook/transactions` | Thêm giao dịch |

### Project Management
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/projects` | Danh sách dự án |
| POST | `/api/projects` | Tạo dự án mới |
| PUT | `/api/projects/{id}` | Cập nhật dự án |
| DELETE | `/api/projects/{id}` | Xóa dự án |
| GET | `/api/tasks` | Danh sách công việc |
| POST | `/api/tasks` | Tạo công việc mới |
| PUT | `/api/tasks/{id}` | Cập nhật công việc |
| DELETE | `/api/tasks/{id}` | Xóa công việc |
| GET | `/api/tasks/status/counts` | Thống kê trạng thái task |
| GET | `/api/team` | Danh sách team members |
| POST | `/api/team` | Thêm team member |
| GET | `/api/project-statistics` | Thống kê dự án |

---

## 🧮 Công thức tính lương | Salary Calculation

### Bảng thuế TNCN 2024 | PIT Tax Brackets
| Bậc | Thu nhập chịu thuế (VND) | Thuế suất |
|-----|--------------------------|-----------|
| 1 | Đến 5,000,000 | 5% |
| 2 | 5,000,000 - 10,000,000 | 10% |
| 3 | 10,000,000 - 18,000,000 | 15% |
| 4 | 18,000,000 - 32,000,000 | 20% |
| 5 | 32,000,000 - 52,000,000 | 25% |
| 6 | 52,000,000 - 80,000,000 | 30% |
| 7 | Trên 80,000,000 | 35% |

### Bảo hiểm | Insurance
- **BHXH Công ty**: 21.5% lương đóng BH
- **BHXH Nhân viên**: 10.5% lương đóng BH
- **Mức trần BHXH**: 46,800,000 VND
- **Mức trần BHYT**: 99,200,000 VND

### Giảm trừ | Deductions
- **Giảm trừ bản thân**: 11,000,000 VND/tháng
- **Giảm trừ người phụ thuộc**: 4,400,000 VND/người/tháng

---

## 📝 Hướng dẫn sử dụng | User Guide

### 1. Đăng nhập
- Mở trình duyệt và truy cập http://localhost:2120
- Nhập username và password
- Nhấn "Đăng nhập"

### 2. Quản lý nhân viên
- Vào menu "Nhân viên" để xem dashboard
- Nhấn "Thêm mới" để thêm nhân viên
- Nhấn vào tên để xem chi tiết
- Sử dụng bộ lọc để tìm kiếm

### 3. Tính lương
- Vào menu "Bảng lương"
- Import file Excel hoặc nhập thủ công
- Hệ thống tự động tính thuế, BH
- Xuất Excel hoặc gửi email payslip

### 4. Tạo biểu mẫu công tác
- Vào menu "Biểu mẫu công tác"
- Chọn loại form (F21/F22/F23)
- Điền thông tin chuyến công tác
- Nhấn "Tạo form" để xuất file Word

### 5. Quản lý dự án
- Vào menu "Project Management"
- **Kanban Board**: Kéo thả task giữa các cột (To Do, In Progress, Done)
- **Gantt Chart**: Xem timeline tổng quan dự án
- **Projects**: Tạo và quản lý các dự án
- **Tasks**: Phân công công việc, set deadline, priority
- **Team Timeline**: Xem lịch làm việc của từng thành viên
- **Workload Dashboard**: Đánh giá khối lượng công việc

---

## 🔒 Bảo mật | Security

- Mật khẩu được mã hóa trước khi lưu
- Session-based authentication
- CORS được cấu hình cho môi trường production
- Input validation với Pydantic
- XSS protection

---

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🤝 Đóng góp | Contributing

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📞 Liên hệ | Contact

Nếu bạn có câu hỏi hoặc góp ý, vui lòng tạo Issue trên GitHub.

---

<p align="center">
  Made with ❤️ for Vietnamese Enterprises
</p>

