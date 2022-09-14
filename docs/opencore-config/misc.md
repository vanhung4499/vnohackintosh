---
title: Misc
---

:::tip
Phần này cơ bản chính mấy thứ linh tinh, không có cần phải xem hết, chỉ cần biết vài tính năng cơ bản là được, còn lại cứ để mặc định!
:::

## Boot

Tôi thường hay sử dụng như này, chú ý vào các mũi tên:

![](/img/docs/opencore-config/occ-misc-boot.png)

+ **Picker Mode**: Thường đặt là **External**, nghĩa là dùng các theme bên ngoài cho OC (miễn là bạn đã có theme trong thư mục **Resources**)
+ **PickerVariant**: Chọn theme mà bạn muốn, tôi để Auto để tự chọn theme có sẵn
+ **Timeout**: Thời gian tự động boot vào phân vùng mặc định, tức là lúc bật máy vào OC, nếu không chọn gì máy sẽ tự động vào phân vùng mặc định. Tôi thường để 5 (s)
+ **Show Picker**: Hiển thị màn hình chọn, nếu tắt thì sẽ tự động boot vào vùng mặc định 
+ **HideAuxiliary**: Ẩn Recovery và các công cụ khác, chỉ hiện các vùng boot win/mac/linux
+ **PollAppleHotKeys**: Một tính năng hay nhưng ít khi tôi dùng
  + Cần được sử dụng kết hợp với Quirk `KeySupport=Yes`
  + Với cách này, không cần thêm thông số `-v` trong boot-args thay vào đó bấm `Commad/Ctrl + V` là được, rất đơn giản và tiện lợi
  + Tổ hợp phím tắt:
    + `Cmd + V`: chế độ verbose (`-v`)
    + `Cmd + Opt + P + R`: reset NVRAM
    + `Cmd + R`: khởi động Recovery
    + `Cmd + S`: khởi động vào chế độ `single user`
    + `Cmd + C + MINUS`: (MINUS là dấu trừ `-`) Tắt kiểm tra tính tương thích của bo mạch chủ, tương đương với việc thêm số nhận dạng khởi động `-no_compat_check`
    + `Shift`: Safemode

## Debug

Phần này chủ yếu được sử dụng để gỡ lỗi (Debug). Phần này có thể sử dụng mặc định:

![](/img/docs/opencore-config/occ-misc-debug.png)

Nhưng trong thực tế khả năng cao sẽ có lỗi xảy ra, phải cấu hình phần này để có thể xem log lỗi, thuận tiện cho việc chuẩn đoán và sửa chữa. Sau đây là các cài đặt được OC chính thức khuyến nghị:

![](/img/docs/opencore-config/occ-misc-debug-mod.png)

Trong đó `Target = 67` có nghĩa là:

![](/img/docs/opencore-config/occ-misc-debug-target.png)

File log khởi động sẽ được lưu vào **thư mục gốc của phân vùng EFI** (ESP), rất tiện cho việc debug.

Sau khi cài đặt xong không lỗi gì nữa bạn có thể đặt `Target = 3` như mặc định để tránh ghi log ra.

## Security

Đây là cài đặt tôi thường dùng:

![](/img/docs/opencore-config/occ-misc-security.png)

+ **Scan Policy**: thường để là **0**, có nghĩa là quét tất cả loại phân vùng, trên thực tế còn nhiều lựa chọn khác

![](/img/docs/opencore-config/occ-misc-security-sc.png)

+ **Valut**: Optional
  + Nếu bạn chọn giá trị khác Optional, bạn sẽ nhận được báo lỗi `Valut`, không thể khởi động được

+ **AllowSetDefault**: Cho phép chọn vùng boot mặc định trong OC

:::info
OpenCore trước 0.8.1 sẽ có 2 tuỳ chọn `AllowNvramReset` và `AllowToggleSip` tương ứng với 2 chức năng `Reset NVRAM` và `Toggle SIP` ở màn hình khởi động OC. nhưng kể từ bản 0.8.2, 2 chức năng này tách biệt ra thành 2 driver riêng, sẽ thêm vào ở phần `UEFI > Driver`.

![](/img/docs/opencore-config/oc-boot-screen.jpeg)

:::