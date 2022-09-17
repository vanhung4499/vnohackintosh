---
title: Kích hoạt Wifi và Bluetooth
---

:::info
Bài viết này chỉ dành cho những card wifi có thể hỗ trợ chỉ có một sỗ mẫu Broadcom và đa số card Intel hoặc USB wifi!
Nếu mà card trong máy bạn là Qualcom, Realtek, ... thì bỏ qua và thay thế thôi!
:::

## Broadcom

### BCM94360

Các mã card wifi sau không cần fix gì cả, nhận native, dùng được airdrop:
+ BCM94360CS2 (2 râu)
+ BCM94360CS (3 râu)
+ BCM943602CS (3 râu)
+ BCM94360CD (4 râu)
+ BCM943602DCP (4 râu)
+ BCM94360NG 
+ BCM94360Z4

:::info
2 con `NG` và `Z4` là được các pháp sư trung hoa phù phép biến hoá từ mấy con card Apple về hình dáng của card thường lắp cho máy Windows.
:::

### BCM94331

Thường thấy **BCM94331CSAX** và **BCM94331CD**:
+ Trước Catalina, hoạt động native, không chỉnh sửa gì!
+ Từ bản Catalina trở đi, phải thêm kext `AirportBrcmFixup` mới dùng được wifi, bluetooth tự nhận
+ Bluetooth của những mã card này không hoạt động được trên macOS Monterey

### BCM94352

Có mấy mã wifi sau:
+ Dell DW1560


## Intel