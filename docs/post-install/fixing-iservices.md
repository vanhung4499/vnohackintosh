---
title: Kích hoạt iMessage và Facetime
---

:::info
Để iMessage và Facetime có thể hoạt động cần chỉnh sửa thông tin SMBIOS đúng.ngoài ra còn một số thành phần khác có thể ảnh hưởng tới, tôi sẽ đề cập phía dưới.
:::

:::danger Điều kiện cần
+ Một điều quan trọng nhất đó là AppleID của bạn phải **chuẩn**! Tức là nó được đăng ký và đang dùng bình thường trên iPhone của bạn!
+ Phải dùng iPhone để xác nhận bảo mật 2 lớp! Không có iPhone thì bỏ qua luôn bài này!
:::

## Sửa lỗi en0

Đầu tiên, dùng [Hackintool](https://github.com/headkaze/Hackintool) để kiểm tra, chọn **System** -> **Peripherals**, nhìn vào phần **Network Interface**, cột **BSD Name**

+ Nếu thấy có `en0` rồi thì qua bước tiếp theo
+ Nếu có device mà không thấy `en0` chỉ có `en1/en2/en3,...`:
  + Mở **Terminal** lên và chạy hai lệnh sau:

    ```bash
    sudo rm /Library/Preferences/SystemConfiguration/NetworkInterfaces.plist
    sudo rm /Library/Preferences/SystemConfiguration/preferences.plist
    ```

+ Nếu trống trơn, tức là máy bạn không có wifi hay ethernet gì cả hoặc bạn dùng usb wifi (thường gặp trên laptop):
    + Cần thêm `NullEthernet.kext` và `ssdt-rmne.aml` vào EFI và config để giả mạo thiết bị ethernet
    + Sau khi restart mà vẫn không thấy `en0` đâu thì chạy thêm 2 lệnh ở trên

![](/img/docs/post-install/hkt-en0.png)

## SMBIOS

Việc sinh thông số SMBIOS được hỗ trợ bởi các config editor (**OCC** và **OCAT**) rất dễ dàng, việc của bạn là cần chọn Serial Number và ROM đúng!

### ROM

Để đơn giản nhất hãy đặt nó thành một giá trị rom sai: VD `112233445566` (tôi luôn dùng số này), `112233000000`, ...

Các hướng dẫn khác sẽ hướng dẫn bạn đặt rom theo mac adrress, cũng đúng nhưng phiền phức. Các tôi làm trên đã được kiểm chứng trên rất nhiều máy khách hàng!

### Kiểm tra Serial Number

Sau khi tạo được thông tin hãy kiểm tra Serial Number!

OCC và OCAT có sẵn nút để vào trang web Apple để kiểm tra Serial Number:
+ OCC: `Check Coverage`
+ OCAT: `Check` trên cùng dòng với Serial Number

Vào trang web rồi nhập captcha, và kiểm tra! Sẽ có một số trường hợp sau:

+ **We're sorry, we're unable to check coverage for this serial number.**

    ![](/img/docs/post-install/sn-not-valid.png)

    + Đây là số seri không hợp lệ! Nhưng trên thực tế việc dùng số seri này lại không ảnh hưởng gì tới việc sử dụng các dịch vụ của Apple. Vì vậy tôi khuyến nghị chỉ dùng những số seri như này!

+ **Valid Purchase Date**
    
    ![](/img/docs/post-install/sn-valid.png)
    
    + Không được sử dụng seri này vì đang có người khác sử dụng, nếu bạn dùng nó một số dữ liệu sẽ được sync về máy gây ảnh hưởng. Và nếu bạn bạn đăng nhập AppleID sẽ thì được vào black list ngay!

+ **Purchase Date not Validated**

    ![](/img/docs/post-install/sn-no-purchase.png)

    + Có nghĩa là số seri này hợp lệ và máy chưa được kích hoạt! Đây đúng là số seri hoàn hảo nhất nhưng sẽ khó gặp. Nhưng không nên dùng vì lỡ đâu người khác họ kích hoạt thì AppleID của bạn cũng sẽ gặp vấn đề đấy vì bạn đang dùng seri máy của người khác mà!

**Nói chung là khi nào check SN ra đỏ tức là OK!**

## Đăng nhập

Bạn tiến hành đăng nhập trong `System Preferences`!

Yêu cầu bắt buộc là ở bước kiểm tra bảo mật 2 lớp là bạn phải kiểm tra code và xác nhận trên iPhone, nếu không thì khả năng vào được iMessage Facetime gần như không có!

:::tip Blacklist
Trường hợp đã thực hiện đầy đủ các bước trên, đăng nhập vẫn lỗi thì đó là do AppleID của bạn.

Thực hiện gọi cho [Apple](https://support.apple.com/en-us/HT201232) để yêu cầu kích hoạt lại (đừng có nói là Hackintosh không thì dẹp!)

Nếu vẫn không được, thực hiển đổi thông tin smbios, lập AppleID mới và thử lại! Thêm thẻ thanh toán vào AppleID cho tăng khả năng thành công!
:::