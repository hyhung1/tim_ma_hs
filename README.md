# Hướng dẫn Đánh giá Workload Nhân viên - Dashboard
_Tài liệu ngày 27/11/2025_

---

## **Tổng quan**

Workload Dashboard trong phần **Project Management** cung cấp cái nhìn tổng quan về khối lượng công việc của từng nhân viên dựa trên các task được giao. Hệ thống phân tích và đánh giá workload dựa trên **độ phức tạp của task (Complexity)** và tự động phát hiện các dấu hiệu quá tải.

---

## **📊 Cách tính điểm Workload (Workload Score)**

### **1. Điểm phức tạp Task (Complexity Points)**

Mỗi task được gán điểm dựa trên độ phức tạp:

| Độ phức tạp | Điểm mặc định | Màu sắc |
|-------------|---------------|---------|
| 🔴 **High** | 6 điểm | Fuchsia/Đỏ tím |
| 🟠 **Medium** | 3 điểm | Indigo/Xanh tím |
| 🟢 **Low** | 1 điểm | Teal/Xanh lá |

> **Lưu ý:** Điểm phức tạp có thể tùy chỉnh trong Dashboard bằng nút "✏️ Edit" tại phần **Complexity Points**.

### **2. Công thức tính Workload Score**

```
Workload Score = Σ (Complexity Points của tất cả task đang active)
```

Ví dụ:
- 2 task HIGH = 2 × 6 = 12 điểm
- 3 task MEDIUM = 3 × 3 = 9 điểm  
- 1 task LOW = 1 × 1 = 1 điểm
- **Tổng: 22 điểm**

---

## **🚨 Tiêu chí Đánh giá Trạng thái Workload**

### **Ngưỡng trạng thái (Status Thresholds)**

| Trạng thái | Điều kiện | Biểu tượng | Ý nghĩa |
|------------|-----------|------------|---------|
| ✅ **Safe** | < 18 điểm | Xanh lá | Workload ổn định, có thể nhận thêm task |
| ⚠️ **Warning** | 18-24 điểm | Vàng | Cần theo dõi, sắp đạt ngưỡng quá tải |
| 🚨 **Overloaded** | > 24 điểm | Đỏ | Quá tải, cần phân bổ lại công việc |

> **Lưu ý:** Ngưỡng này có thể tùy chỉnh trong Dashboard bằng nút "✏️ Edit" tại phần **Status Thresholds**.

---

## **⚠️ Hệ thống Cảnh báo (Alerts)**

Dashboard tự động phát hiện và cảnh báo các tình huống sau:

### **1. Số task đồng thời quá nhiều**
```
🔴 Trigger: > 5 tasks running simultaneously
```
- Khi nhân viên có hơn 5 task đang chạy cùng lúc
- Dấu hiệu của việc phân bổ không đều

### **2. Nhiều task độ phức tạp cao**
```
🔴 Trigger: ≥ 2 HIGH complexity tasks at once
```
- Khi có từ 2 task HIGH complexity trở lên chạy song song
- Rủi ro cao về quality và deadline

### **3. Overlap giữa nhiều dự án**
```
🔴 Trigger: Cross-project overlaps > 0
```
- Khi task từ các project khác nhau có thời gian trùng lặp
- Context switching gây giảm hiệu suất

### **4. Làm việc trên quá nhiều dự án**
```
🔴 Trigger: Working on > 2 different projects
```
- Khi nhân viên tham gia hơn 2 project khác nhau
- Phân tán focus và resource

### **5. Task không tiến triển**
```
🔴 Trigger: > 2 tasks with 0% progress
```
- Khi có hơn 2 task có progress = 0%
- Dấu hiệu của việc không đủ capacity

---

## **📋 Thông tin hiển thị cho mỗi Nhân viên**

Dashboard hiển thị card cho mỗi nhân viên với các thông tin:

### **Header**
- **Tên nhân viên** và avatar
- **Số task** đang được giao
- **Số project** đang tham gia
- **Status badge** (Safe/Warning/Overloaded)

### **Workload Score Bar**
- Thanh progress bar trực quan
- Hiển thị số điểm workload
- Màu sắc thay đổi theo trạng thái

### **Task Complexity Breakdown**
- Số lượng task theo từng mức độ phức tạp
- High (Fuchsia), Medium (Indigo), Low (Teal)

### **Projects**
- Danh sách project nhân viên đang tham gia
- Số task trong mỗi project

### **Alerts**
- Các cảnh báo tự động khi phát hiện vấn đề

---

## **📈 Phân tích Ví dụ Thực tế**

### **Ví dụ 1: John Doe (ĐANG QUÁ TẢI)**

**Khoảng thời gian 01-11 đến 24-11-2025:**

```plaintext
PROJECT: Idemitsu - Telecomunication maintenance (Rev1)
✓ Task: CCTV (01-11→18-11) - HIGH - in_progress [0%]
✓ Task: Meteo (01-11→20-11) - HIGH - in_progress [0%]
✓ Task: Tel (01-11→15-11) - MEDIUM - in_progress [0%]
✓ Task: VHF (01-11→12-11) - MEDIUM - in_progress [0%]

PROJECT: PTSC - SCADA and Telecom (Rev0)
✓ Task: Meteo (07-11→19-11) - HIGH - done [100%]
✓ Task: Cabinet (07-11→13-11) - LOW - in_progress [0%]
```

**Tính điểm Workload:**
| Độ phức tạp | Số lượng | Điểm |
|-------------|----------|------|
| HIGH | 3 tasks | 3 × 6 = 18 |
| MEDIUM | 2 tasks | 2 × 3 = 6 |
| LOW | 1 task | 1 × 1 = 1 |
| **TỔNG** | **6 tasks** | **25 điểm** |

**Đánh giá:**
- 🚨 **Status: OVERLOADED** (> 24 điểm)
- ⚠️ Alert: 3 HIGH complexity tasks at once
- ⚠️ Alert: Working on 2 different projects
- ⚠️ Alert: Cross-project overlaps detected
- ⚠️ Alert: Multiple tasks with 0% progress

---

### **Ví dụ 2: Mike Brown (MỨC ĐỘ HỢP LÝ)**

**Khoảng thời gian 01-11 đến 24-11-2025:**

```plaintext
PROJECT: Idemitsu - Telecomunication maintenance (Rev1)
✓ Task: UHF (01-11→12-11) - MEDIUM - in_progress [0%]

PROJECT: PTSC - SCADA and Telecom (Rev0)
✓ Task: CCTV (07-11→18-11) - HIGH - done [100%]
✓ Task: Crane (07-11→13-11) - MEDIUM - in_progress [0%]
```

**Tính điểm Workload:**
| Độ phức tạp | Số lượng | Điểm |
|-------------|----------|------|
| HIGH | 1 task | 1 × 6 = 6 |
| MEDIUM | 2 tasks | 2 × 3 = 6 |
| **TỔNG** | **3 tasks** | **12 điểm** |

**Đánh giá:**
- ✅ **Status: SAFE** (< 18 điểm)
- Số task hợp lý, có thể nhận thêm công việc

---

## **💡 Các tính năng nâng cao**

### **1. Filter theo Status**
- Lọc hiển thị nhân viên theo trạng thái: All, Safe, Warning, Overloaded
- Giúp nhanh chóng identify các nhân viên cần hỗ trợ

### **2. Sort theo tiêu chí**
- **Workload Score**: Sắp xếp theo điểm workload (cao → thấp)
- **Name**: Sắp xếp theo tên
- **Task Count**: Sắp xếp theo số task

### **3. Tùy chỉnh Complexity Points**
```json
{
  "high": 6,    // Có thể điều chỉnh
  "medium": 3,  // Có thể điều chỉnh
  "low": 1      // Có thể điều chỉnh
}
```

### **4. Tùy chỉnh Status Thresholds**
```json
{
  "SAFE_MAX": 18,      // Có thể điều chỉnh
  "WARNING_MAX": 24    // Có thể điều chỉnh
}
```

---

## **🔄 Cách Dashboard lọc Task**

Dashboard chỉ tính workload cho các task thuộc:

1. **Project có status "On-going"** - Không tính project đã Done
2. **Revision mới nhất** - Nếu project có nhiều revision, chỉ lấy revision cao nhất
3. **Tất cả task của project** - Bao gồm cả task done và in_progress

Điều này đảm bảo workload phản ánh đúng công việc thực tế đang diễn ra.

---

## **📊 Summary Cards**

Dashboard hiển thị 4 summary cards ở đầu trang:

| Card | Nội dung |
|------|----------|
| **Total Members** | Tổng số nhân viên có task |
| **✅ Safe** | Số nhân viên an toàn |
| **⚠️ Warning** | Số nhân viên cần theo dõi |
| **🚨 Overloaded** | Số nhân viên quá tải |

---

## **🎯 Đề xuất Quản lý Workload**

### **Khi nhân viên ở trạng thái SAFE:**
- ✅ Có thể assign thêm task mới
- ✅ Ưu tiên assign task HIGH complexity nếu cần

### **Khi nhân viên ở trạng thái WARNING:**
- ⚠️ Cân nhắc kỹ trước khi assign thêm task
- ⚠️ Ưu tiên task LOW hoặc MEDIUM complexity
- ⚠️ Theo dõi progress thường xuyên

### **Khi nhân viên ở trạng thái OVERLOADED:**
- 🚨 Không nên assign thêm task mới
- 🚨 Xem xét redistribute task sang người khác
- 🚨 Review lại priority của các task hiện tại
- 🚨 Thảo luận với nhân viên về khó khăn

---

## **📝 Lưu ý quan trọng**

1. **Workload Score chỉ dựa trên Complexity** - Không tính overlapping score vào tổng điểm
2. **Overlapping được tracking riêng** - Dùng để hiển thị alerts, không ảnh hưởng score
3. **Cài đặt được lưu trong localStorage** - Complexity points và thresholds được lưu trữ local
4. **Data refresh tự động** - Dashboard tự động refresh data khi chuyển tab

---

## **📚 Tham khảo Code**

Component chính: `frontend/src/components/WorkloadDashboard.tsx`

Interface MemberWorkload:
```typescript
interface MemberWorkload {
  name: string;
  totalTasks: number;
  activeTasks: number;
  overlappingTasks: number;
  multiProjectOverlap: number;
  projectCount: number;
  complexityScore: number;
  overlappingScore: number;
  totalScore: number;
  status: 'safe' | 'warning' | 'overloaded';
  alerts: string[];
  tasksByProject: Map<string, number>;
  highComplexityCount: number;
  mediumComplexityCount: number;
  lowComplexityCount: number;
}
```

---

*Tài liệu này giải thích chi tiết cách Workload Dashboard đánh giá và theo dõi khối lượng công việc của nhân viên trong hệ thống VIVN_HRM.*

