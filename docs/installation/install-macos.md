---
title: Cài đặt macOS vào ổ cứng
---

:::info
Sau khi setup bios xong, bạn sẽ tiến hành boot vào usb và tiến hành cài đặt.
:::

:::tip
Nếu bạn chưa map usb, hãy cắm usb cài vào cổng usb 2.0 (màu đen) để tránh lỗi không nhận usb 3.0!
:::

Quá trình cài đặt được mô tả như sau:

- Sau khi boot vào USB, màn hình OpenCore sẽ hiện ra, bạn sẽ thấy các lựa chọn boot (mac/win/linux) và tool (reset nvram, toggle sip) ở đây
  - Chọn `Install macOS <version>` với `<version>` là tên bản mac, VD `Install macOS Monterey`

    ![install-1.png](/img/docs/installation/install-1.png)

- Tiếp theo, là một màn hình toàn chữ chạy (cảm giác như hacker).
  - Và bùm, nháy màn một phát, quả táo cắn dở hiện ra, hãy vui vì bạn đã boot vào được bộ cài, tiếp tục bước tiếp.
  - Còn không thì bạn sẽ bị kẹt ở một dòng chữ nào đó -> hãy chụp ảnh lại và đọc xem lỗi gì -> đọc lại phần trước, kiểm tra lại efi và làm lại. Bạn cũng có thể đăng group hoặc hỏi những người khác nhưng hãy nêu đủ thông tin.

- Sau khi vào được bộ cài mac thì một màn hình chọn ngôn ngữ sẽ hiện ra, vui lòng chọn `English` (vì tôi hướng dẫn thao tác sau đó theo tiếng anh)

- Kế tiếp là màn hình **Tools** xuất hiện, vui lòng chọn **Disk Utility** để tiến hành xoá phân vùng.

    ![install-2.png](/img/docs/installation/install-2.png)

- Trong **Disk Utility**, chọn **View --> Show all Devices**, bước này rất quan trọng.

    ![install-3.png](/img/docs/installation/install-3.png)

- Bây giờ bạn sẽ thấy tên tất cả ổ cứng của bạn hiện ra, kèm theo tên các phân vùng hiển thị ngay dưới tên ổ cứng. Như tôi đã nói trước, có 2 trường hợp, xoá phân vùng và xoá nguyên ổ cứng.
  - Nếu xoá nguyên ổ cứng để cài mac, chọn tên ổ cứng rồi chọn **Erase**, Disk Utility sẽ xoá toàn bộ và tạo 2 phân vùng, EFI 200MB và phân vùng còn lại cho mac địng dạng APFS
  - Nếu chỉ xoá phân vùng thì chọn đúng phân vùng đã chuẩn bị rồi chọn **Erase**, chỉ phân vùng này sẽ bị xoá qua định dạng APFS
  
    ![install-4.png](/img/docs/installation/install-4.png)

- Hộp thoại **Erase** hiện ra, chọn thông số chọn như sau và bấm nút **Erase**:
  - Name: Tự đặt, tôi hay đặt là **MAC** hoặc **Macintosh HD**
  - Format: **APFS**
  - Scheme: **GUID Partition Map**

    ![install-5.png](/img/docs/installation/install-5.png)

- Sau khi xoá xong bấm **Done** và đóng cửa sổ lại (nút màu đỏ), quay lại màn hình **Tools**
  - Chọn **Install macOS Monterey** (dòng 2) -> Continue
  - Chọn Continue -> Agree -> Agree
  - Chọn vùng đã xoá lúc nãy -> **Continue**
  - Ngồi chờ cài

- Quá trình cài đặt sẽ phải restart khoảng 3-4 lần (tuỳ bản mac), mỗi lần restart bạn cứ để máy tự chạy, opencore sẽ tự chọn `macOS Installer`. Vì đã set usb là boot mặc định trong BIOS nên không cần vào Boot Options nữa. Sẽ mất tầm 30-40 phút!

- Khi quá trình cài kết thúc, màn **Welcome** sẽ hiện ra, bạn cứ chọn theo hướng dẫn trên màn hình mà chọn, không khó làm mà cũng không cần quan tam quá nhiều vì vào trong set lại được.
- Quá trình có thể sẽ diễn ra như sau:
  - Chọn Region (vùng) là VietNam (kéo xuống gần dưới cùng hoặc bấm phím `V`) hoặc ở đâu thì chọn nước đó -> Continue
  - Chọn Wifi để kết nối nếu không có lan, không kết nối ở bước này -> Other Network Options -> My Computer don't connect to the internet -> Continue
  - Enable Location Services, tích hay không thì tuỳ -> Continue
  - Cứ chọn Continue hoặc Agree cho qua
  - Tạo user account và password, tự đặt -> Continue
  - Sign in to iCloud and App Store -> Skip
  - Enable Siri, bỏ tích, không khi nào dùng

- Sau cùng màn hình Desktop macOS đẹp mộng mơ hiện ra! Chúc mừng bạn đã đi được đoạn đường dài, và chuẩn bị tinh thần chinh chiến fix lỗi tiếp!

    ![install-6.png](/img/docs/installation/install-6.png)
