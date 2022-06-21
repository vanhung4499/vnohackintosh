---
title: Kiến thức cần phải biết
---

:::info
+ Do có nhiều từ ngữ chuyên ngành, không dịch ra được tiếng việt hoặc dịch ra nó ngu nên sẽ để nguyên tiếng anh, việc dùng tiếng việt kèm theo một vài từ tiếng anh ở đây là bất khả kháng không phải là tôi muốn cho ngầu!
+ Có nhiều kiên thức khó có thể tóm tắt được nên tôi sẽ dùng link của một bài viết khác để thay thế!
:::

## Lý do cần phải biết những thuật ngữ này
1. Để hiểu **nó là gì?**
2. Có thể trao đổi với người khác một cách nhanh chóng
    - Giả sử người khác chỉ cách xử lý lỗi cho bạn, họ đề cập một vài từ tiếng anh và bạn chả biết nó gì xong bạn đi hỏi người ta, khả năng cao là họ sẽ lười giải thích cho bạn vì đơn giản điều đó làm mất thời gian

## Các thuật ngữ cơ bản

| Thuật ngữ                 | Mô tả                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **OS**                    | Operation System, hệ điều hành                                                                                                               |
| **Hackintosh**            | Là quá trình cài đặt macOS lên hệ thống không phải của Apple. **Hackintosh không phải là hệ điều hành**, cho nên là đừng nói cài hackintosh! |
| **Bootloader**            | Phần mềm khởi động và tải hệ điều hành                                                                                                       |
| **OpenCore**              | Bootloader mới dành cho Hackintosh được phát triển bởi [Acidanthera team](https://github.com/acidanthera) với nhiều ưu điểm                  |
| **Clover**                | Bootloader cho hackintosh nhưng cũ hơn, vẫn đang được update và vẫn dùng tốt                                                                 |
| **Kext**                  | **K**ernel **Ext**ensions, hiểu đơn giản là driver của macOS                                                                                 |
| **BIOS**                  | [blogchiasekienthuc](https://blogchiasekienthuc.com/thu-thuat-may-tinh/bios-la-gi-cach-truy-cap-vao-bios-cua-may-hp-sony.html)               |
| **Legacy+MBR - UEFI+GPT** | [anhdv](https://anh-dv.com/thu-thuat-hay/so-sanh-mbr-voi-gpt-va-legacy-voi-uefi)                                                             |
| **Native / OOB**          | (Out-Of-Box) Tự hoạt động, được apple hỗ trợ sẵn, không cần kext hay chỉnh sửa acpi gì cả                                                    |
| **ACPI**                  | The Advanced Configuration and Power Interface (ACPI), cho phép hệ thống xác định và điều chỉnh thông tin phần cứng, sẽ đề cập về sau        |
| **DSDT / SSDT**           | Các bảng trong ACPI mô tả các thiết bị và cách hệ điều hành sẽ tương tác với chúng                                                           |
| **.AML**                  | định dạng file đã được biên dịch trong ACPI                                                                                                  |
| **.DSL**                  | các file mã nguồn ACPI chưa được biên dịch                                                                                                   |
| **NVRAM**                 | Bộ nhớ truy cập ngẫu nhiên không thay đổi, đi kèm với bo mạch chủ, NVRAM sẽ được tải đầu tiên khi khởi động UEFI                             |
| **Reset NVRAM**           | Xoá bộ nhớ NVRAM đi, tương tự như việc bạn reset CMOS trong BIOS                                                                             |
