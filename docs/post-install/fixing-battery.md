---
title: Hiển thị phần trăm pin
---

:::info
Chỉ dành cho laptop, hiện giờ việc xử lý phần trăm pin khá đơn giản! Nếu bạn không có pin hoặc không xử lý thì `Trackpad Preferences` trong `System Preferences>Trackpad` không hiển thị gì cả.
:::

## Vấn đề AppleACPIPlatform

Pin của các laptop thường sẽ không tương thích với Apple SMBus, vì vậy cần dùng ACPI để truy cập thông tin pin trong macOS. Kext được sử dụng ở đây sẽ là `SMCBatteryManager`.

Thêm vào đó là `AppleACPIPlatform` không thể truy cập chính xác vào các thuộc tính trong EC (embedded controller), cụ thể là không thể đọc hay ghi vào các thuộc tính lớn hơn 1 byte (8 bit). Dẫn tới `SMCBatteryManager` không thể sử dụng được các phương thức ACPI (_BIF, _STA, _BST, ...). Do đó nếu bạn dùng kext này nếu không truy cập được được tới pin, sẽ có rất nhiều lỗi về pin hiện ra!

Rất nhiều laptop, trong DSDT, EC sẽ chứa các thuộc tính pin lớn hơn 1 byte, cần phải có biện pháp để xử lý vấn đề này! Có 2 cách sau:

+ `ECEnabler.kext` (Khuyến nghị)
+ Patch DSDT

## ECEnabler

`ECEnabler` chính là giải pháp để cho phép đọc các thuộc tính EC lớn hơn 1 byte, từ đó `SMCBatteryManager` có thể hoạt động bình thường.

Cách dùng đơn giản là chỉ cần thêm `ECEnabler` + `SMCBatteryManager` vào EFI và kích hoạt chúng trong config! 

Lưu ý ECEnabler phải load trước SMCBatteryManager!

## Patch DSDT

Đây là cách cổ điển khi chưa có `ECEnabler`!

Tôi không khuyến khích các bạn tìm hiểu vì nó khó hiểu và dài dòng!

Nhưng nếu muốn trở thành pro trong mảng này thì phải biết, tham khảo bài viết gốc của Rehabman:

+ [Rehabman's how to patch DSDT for working battery status](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)

+ [Rehabman's Guide to Using Clover to "hotpatch" ACPI](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)

## Dual Battery

Thường chỉ gặp trên các laptop Thinkpad, đã dính tới 2 pin thì chắc chắn bạn sẽ phải động chạm tới patch ACPI.

Do macOS không hỗ trợ 2 pin (làm gì có con macbook nào 2 pin) nên họ sẽ không có xử lý tình trạng này. Cần tạo `SSDT-BATC` để quản lý trạng thái 2 pin!

Vui lòng đọc thêm ở phần sau: [Patch Battery](/docs/acpi-patching/fixing-battery-percent)

:::info
Ngoài ra còn một số vấn đề nhỏ khác về pin không đáng quan tâm lắm nên tôi sẽ không đề cập!
:::