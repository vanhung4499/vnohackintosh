---
title: NVRAM
---

:::info
Phần NVRAM này sẽ tương tác trưc tiếp với phần cứng NVRAM, thêm xoá các giá trị vào NVRAM. Cơ bản chỉ tập trung vào một số tuỳ chọn, còn lại hãy để mặc định.
:::

![](/img/docs/opencore-config/xc-nvram.png)

Thường tập trung vào các tuỳ chọn sau:

![](/img/docs/opencore-config/occ-nvram-boot-args.png)

## boot-args

Dùnng để đặt một số tham số khởi động (boot arugment):

Một số thông số hay dùng:

| boot-args          | Mô tả                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------- |
| `-v`               | Chế độ verbose                                                                        |
| `dart=0`           | Tắt VT-d                                                                              |
| `debug=0x100`      | Ngăn máy không restart khi gặp KP, dễ xem lỗi                                         |
| `keepsyms=1`       | Đi kèm với `debug=0x100` để báo cho OS xuất log khi KP                                |
| `-no_compat_check` | Tắt kiểm tra tính tương thích, vd khi phần cứng cũ boot trên mac mới                  |
| `slide=#`          | Đặt giá trị slide KASLR theo cách thủ công, rất ít khi dùng                           |
| `alcid=xx`         | Tiêm layout-id cho AppleALC                                                           |
| `agdpmod=pikera`   | GPU AMD mới từ 5XXX 6XXX phải thêm thông số này, không thì sẽ gặp tình trạng đen màn  |
| `-wegnoegpu`       | Tắt các card đồ hoạ rời                                                               |
| `-igfxblr`         | Sửa lỗi không có độ sáng màn hình trên coffee lake, whisky lake, comet lake, ice lake |
| `nvda_drv_vrl=1`   | Kích hoạt NVIDIA web driver cho Maxwell và Pascal trong macOS High Sierra             |

## csr-active-config

Cấu hình **System Integrity Protection (SIP)**, thường tắt để cài app crack.

Các giá trị `csr-active-config`:

- `00000000` - SIP bật (0x0)
- `FF030000` - Tắt SIP trên macOS High Sierra (0x3ff)
- `FF070000` - Tắt SIP trên macOS Mojave và macOS Catalina (0x7ff)
- `67080000` - Tắt SIP trên macOS Big Sur (0x867)
- `EF0F0000` - Tắt SIP trên macOS Monterey (0xfef)

Tuỳ theo bản mac mà bạn chọn giá trị phù hợp để tắt SIP

## prev-lang:kbd

Tuỳ chọn này sẽ quyết định ngôn ngữ khi boot vào bộ cài mac.

Nếu bạn boot vào bộ cài mac và nhận thấy là Tiếng Nga, thì đó là do bạn để giá trị mặc định là `72752D52 553A3235 32`, phải đổi lại giá trị khác tương ứng với ngôn ngữ và đặt lại NVRAM để có hiệu lực.

| Ngôn ngữ    | STRING    | DATA                     |
| ----------- | --------- | ------------------------ |
| Tiếng Anh   | en-US:0   | 656e2d55533a30           |
| Tiếng Trung | zh-Hans:0 | 7A682D48 616E733A 323532 |

Hoặc là để trống giá trị này thì bạn sẽ chọn ngôn ngữ lúc khởi động vào bộ cài!

:::danger
Trên macOS Big Sur, nếu như bạn để trống giá trị `prev-lang:kbd` mà để `Type = STRING` thì khởi động bộ cài bạn sẽ nhận được một màn hình màu xám và con trỏ chuột nhưng không vào phần cài đặt. Giải pháp là đặt lại `Type = DATA` và reset NVRAM để có tác dụng. Sau đó mới boot lại.
:::

## UIScale

![](/img/docs/opencore-config/occ-nvram-uiscale.png)

+ Vị trí: `4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14` -> `UIScale`
+ Ý nghĩa: kích hoạt tính năng gộp điểm ảnh (HiDPI) ở màn hình boot OC
+ Giá trị: 01 hoặc 02
  + 01 nghĩa là giữ nguyên độ phân giải
  + 02 nghĩa là kích hoạt HiDPI, không gian sẽ nhỏ lại, icon và chữ sẽ to ra nhưng nét và đẹp hơn
    + Nên dùng cho màn hình 4K, hiệu ứng sẽ tốt hơn, còn lại không cần

Các phiên bản OC từ 0.8.1 đã chuyển thông số UCScale sang tab "Display Output" trong **UEFI**, để bạn có thể chọn giá trị tương ứng và xoá thuộc tính trong phần NVRAM đi:

![](/img/docs/opencore-config/occ-uefi-output.png)