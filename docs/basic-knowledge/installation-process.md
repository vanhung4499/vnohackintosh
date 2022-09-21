---
title: Quy trình cài đặt
---

## Cách macOS khởi động

Để macOS có thể chạy trên các máy PC/Laptop thông thường thì cần một bootloader đặc biệt, đó là opencore hoặc clover. Hiểu một cách đơn giản Bootloader giúp đánh lừa macOS rằng đây là realmac để nó chịu khởi động. Cụ thể hơn thì bootloader sẽ chỉnh sửa ***ACPI***, nạp ***Kext***, sửa các lỗi logic, giả mạo thông tin realmac, ... để tương thích với macOS.

## Quy trình hackintosh

1. **Chuẩn bị**
  + USB ít nhất 16GB
  + Internet nhanh và ổn định, mạnh để tải file lớn
  + Backup dữ liệu

2. **Tạo bộ cài macOS**
  + Ghi file bộ cài ra USB (bước dễ nhất)
  + Tạo EFI phù hợp
  + Copy EFI vào ESP
  + Chỉnh sửa EFI nếu cần thiết

3. **Cài đặt**
  + Setup BIOS
  + Boot USB bộ cài rồi cài macOS lên ổ cứng

4. **Kiểm tra và sửa lỗi**
  + Kiểm tra cpu, gpu, audio, wifi, bt, ... có hoạt động bình thường không
  + Cài đặt phần mềm cần dùng
  + Không có gì là hoàn hảo cả! Kiểu gì hackintosh thì cũng sẽ có lỗi tiềm ẩn, bạn có chấp nhận được hay không mà thôi!

6. **Đi khoe máy loè thiên hạ (J4F :joy:)**
  + Bật verbose (-v), chữ chạy loạn xạ ngầu như hacker