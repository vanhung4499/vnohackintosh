---
title: Patch iGPU Intel
---

:::info
Đây sẽ là bài viết chuyên sâu về phần card onboard intel graphics, bao gồm các vấn đề như xuất hình ảnh, lỗi tím/nâu màn, HiDPI, ... Nó sẽ khá dài và cũng không hề dễ hiểu, tôi sẽ cố gắng giải dễ hiểu nhất có thể, bạn phải đọc các phần trước để có thể dễ hình dung hơn, tôi sẽ không nhắc lại những điều cơ bản đã đề cập trước.
:::

:::info
Hiện tại và có thể không bao giờ card onboard trong CPU Intel Gen 11 (Tiger Lake) và 12 (Alder Lake) hoặc mới hơn được Apple hỗ trợ nữa! Bài viết này chỉ dành cho Sandy Bridge tới Ice Lake.
:::

## Giải thích những khái niệm cơ bản

Việc patch igpu hay dgpu hiện nay đều được thực hiện thông qua **WhateverGreen** (viết tắt **WEG**). WEG có rất nhiều chức năng, quan trọng nhất vẫn là chỉnh sửa các tiêm các thông số của card màn hình và các bản vá lỗi vào kext GPU tương ứng của Apple.

Trong các real mac, iGPU cũng sẽ có các chức năng khác nhau, do đó chọn SMBIOS cũng sẽ ảnh hưởng tới việc hoạt động của graphic card, cụ thể như sau:

* iGPU dùng để xuất hình ảnh
  * Trên các máy Mac Mini, MacBook Air, MacBook Pro 13" và iMac không có card rời
* iGPU chỉ dùng cho màn trong (internal display) và dGPU xử lý xuất màn hình rời (external display)
  * Trên các máy MacBook Pro 15"
* iGPU chỉ dùng để tính toán (headless) và dGPU xử lý xuất hình
  * Trên các máy iMac có card rời

Một thuật ngữ quan trọng khi dùng WEG là **framebuffer**, nó là một bộ dữ liệu đặc tả cho thông tin các cổng xuất hình và một số thuộc tính khác cho GPU. Chúng được phân biệt với nhau qua `ig-platform-id`. Trong kext GPU của Apple sẽ có các bộ **framebuffer** có sẵn (cho real mac), việc ta cần làm chính chỉnh sửa những **framebuffer** này để iGPU có thể hoạt động bình thường.

Bạn tham khảo [Danh sách framebuffer theo thế hệ iGPU](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) để xem chi tiết về framebuffer hơn!

**WhateverGreen** sẽ dựa vào `device-id` và `ig-platform-id` để patch igpu (tôi đã đề cập tới chúng trong phần Config -> Device Properties). Cụ thể hơn:

- `device-id` sẽ xác định phần cứng tương ứng với kext gpu (của Apple) nào sẽ được chỉnh sửa
  - Sẽ có nhiều kext GPU trong bộ kext của Apple tương ứng cho các gprahic card khác nhau như `AppleIntelFramebufferAzul.kext` (Intel Gen 4 Haswell), `AppleIntelSKLGraphicsFramebuffer.kext` (Intel Gen 6 Skylake), ... Mỗi kext sẽ có một danh sách `device-id` hỗ trợ, dựa vào `device-id` lấy từ phần cứng mà xác định kext nào sẽ chạy.
  - Cần phải fake `device-id` qua **Device Properties** cho một số graphic card có `device-id` không được hỗ trợ bởi kext Apple. Và phải chọn fake qua `device-id` nào mà tương đồng nhất được hỗ trợ. VD [i7-4700HQ](https://www.intel.vn/content/www/vn/vi/products/sku/75116/intel-core-i74700hq-processor-6m-cache-up-to-3-40-ghz/specifications.html) có Intel HD 4600 với `device-id` là `0x416` sẽ cần phải fake nó về `0x412`.

- `ig-platform-id` là thông số để xác định các bộ **framebuffer** (tôi đã nói phía trên)
  - Khi bạn thêm các thông số GPU trong **Device Properties**, bộ dữ liệu này sẽ được tiêm vào kext gpu đã xác định, cụ thể là vào đúng vị trí bộ framebuffer có cùng `ig-platform-id`. Nhắc lại việc thực hiện chỉnh sửa kext hệ thống của Apple là do Lilu hỗ trợ!

:::tip Vậy nếu không tiêm thông tin gì thì sao?
WEG sẽ dựa vào `vendor-id` và `device-id` của gprahic card, chọn kext phù hợp và tiêm vào giá trị `ig-platform-id` mặc định. Xem danh sách phía trên để rõ hơn!

Những card như AMD RX, hay một số NVDIA Kelper không cần tiêm gì cũng vì thế! Kext nó hỗ trợ card dựa theo `device-id` và `vendor-id`, thậm chí cũng chả cần kext WhateverGreen luôn! Khái niệm **native** hoặc **OOB (out-of-box)** cũng hiểu là vậy!
:::

:::info
Bạn sẽ phải thắc mắc là trong cái danh sách framebuffer, dev họ viết `ig-platform-id` như sau `0x3E9B0007` nhưng trong phần Device Properties tôi lại viết `AAPL,ig-platform-id` là `07009B3E`, bạn sẽ thấy nó ngược ngược!

Xin trả lời là dữ liệu truyền vào theo Device Properties hoặc trong các SSDT/DSDT đều sẽ phải theo dạng **Little Edidan**. Nếu bạn học chuyên ngành máy tính sẽ gặp khái niệm này hoặc đọc thêm bài viết tiếng việt sau để hiểu hơn: [**Little endian vs. Big endian**](https://manhhomienbienthuy.github.io/2018/09/20/little-endian-vs-big-endian.html).

Giải thích đơn giản hơn:
- Từ 4 byte `3E9B0007` tách 4 cặp 1 byte -> `3E 9B 00 07` (1 byte = 8 bit, biểu diễn `00` -> `FF`)
- Đổi chéo vị trí các cặp cho nhau `07 00 9B 3E` -> `07009B3E`
:::

## Patch VRAM

:::info
Phần này sẽ giải thích cho việc patch `STOLEN` và `FBMEM` tôi đã viết trước đây.
:::

Lấy một ví dụ tôi gặp nhiều nhất, id cho PC dùng cho UHD 630 (trong cpu Intel 8th 9th 10th) là `0x3E9B0007`

Khi tham khảo [WhateverGreen Intel manual](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md), chọn vào **Spoiler: CFL/CML connectors** bạn sẽ thấy thông tin như sau:

```
ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
Model name: Intel UHD Graphics 630
Camellia: CamelliaDisabled (0), Freq: 0 Hz, FreqMax: 0 Hz
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

Xem xét 2 dòng đầu:

```
ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
```

Framebuffer này yêu cầu `57 MB` cho `STOLEN`, `0 MB` cho `FBMEM`, `1 MB` cho `CURSOR`, vậy tổng lại cần `57 + 0 + 1 = 58` MB cho `TOTAL STOLEN`. Vậy với những mainboard mặc định `DVMT` chỉ có `32 MB` sẽ không đủ yêu cầu. Nếu không thể tăng `DVMT` lên `64 MB` hoặc cao hơn trong BIOS thì sẽ cần patch `stolenmem` và `fbmem`.

Nhắc lại các patch trước đây đã đề cập:

| Key                      | Type | Value      |
| :----------------------- | :--- | :--------- |
| framebuffer-patch-enable | Data | `01000000` |
| framebuffer-stolenmem    | Data | `00003001` |
| framebuffer-fbmem        | Data | `00009000` |

Giải thích các key-value trên:
- `framebuffer-fbmem` = `00009000`
  - `00009000` (LE) ->  `00900000` (hex) -> `9437184` (dec) (byte) -> `9437184/1024/1204 = 9` (MB)
- `framebuffer-stolenmem` = `00003001`
  - `00003001` (LE) ->  `01300000` (hex) -> `19922944` (dec) (byte) -> `19922944/1024/1204 = 19` (MB)
- Tổng lại chỉ cần `19 + 9 + 1 = 29` cho `TOTAL STOLEN` đáp ứng `DVMT` 32MB.

Với framebuffer `3E9B0007` trên thì yêu cầu `FBMEM` `0 MB` nên có thể bỏ luôn patch `framebuffer-fbmem` chỉ cần `framebuffer-stolenmem`.

Nhưng với framebuffer `0A260006` cho laptop Haswell dùng **HD4200/HD4400/HD4600** như sau:

```
ID: 0A260006, STOLEN: 32 MB, FBMEM: 19 MB, VRAM: 1536 MB, Flags: 0x0000000F
TOTAL STOLEN: 52 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 116 MB, MAX OVERALL: 117 MB (123219968 bytes)
```

`FBMEM` yêu cầu `19 MB`, vậy sẽ cần cả 2 patch trên. Ngoài ra framebuffer này đặc biệt cần tăng `CURSOR` lên `6 MB` với patch sau từ **Rehabman**:

| Key          | Type | Value      |
| :----------- | :--- | :--------- |
| framebuffer- | Data | `00006000` |

:::tip
Ngoài ra muốn tăng VRAM của GPU trong `About This Mac` lên `2048 MB` thì thêm như sau (bạn hoàn toàn có thể chỉnh sửa qua số khác):

| Key                    | Type | Value     |
| :--------------------- | :--- | :-------- |
| framebuffer-unifiedmem | Data | `0000080` |

![](/img/docs/post-install/atm-vram.png)

Lưu ý việc tăng VRAM lên thực chất là **comestic** (làm màu) không có tác dụng gì tăng hiệu năng lên gì cả đâu!
:::

## Patch connection

:::info
Phần này tôi đề cập tới việc chỉnh sửa framebuffer để kết nối với màn hình thông qua các cổng xuất hình.
:::

### Vấn đề thực tế

:::info
Trong phần này tôi đặt ra vấn đề cụ thể là xử lý iGPU UHD630 trong CPU Intel 8/9/10 th và trên các mainboard 300/400/500 series không xuất hình qua cổng HDMI được, hiện tượng xảy ra là đen màn hình!
:::

Lấy ví dụ `07009B3E` phía trên, phần dữ liệu về các cổng xuất hình như sau:

```
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - ConnectorDP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

Dễ nhìn ra các giá trị tương ứng như sau:

| Index | Busid |  Pipe  |    Tpye    |    Flag    | Physical Type |
| :---: | :---: | :----: | :--------: | :--------: | :-----------: |
| `01`  | `05`  | `0900` | `00040000` | `C7030000` | Display Port  |
| `02`  | `04`  | `0A00` | `00040000` | `C7030000` | Display Port  |
| `03`  | `06`  | `0800` | `00040000` | `C7030000` | Display Port  |

Ta thấy sẽ có 3 connector (logic) tương ứng với 3 cổng xuất hình (physical). Các cổng vật lý  **port 5, 6, 7** tương ứng với **index 1, 2, 3** do WEG chỉ định!

Việc ta cần làm là xác định busid và type của các cổng, các thành phần khác có thể giữ nguyên:

![](/img/docs/post-install/igpu-port-map.png)

### Busid
  + **Busid** phải là duy nhất, 2 connection không được dùng chung 1 busid
  + Tuỳ theo kiểu cổng xuất hình mà sẽ có các danh sách busid có thể dùng
    
![](/img/docs/post-install/busid-type.jpeg)

### Type

Danh sách các kiểu cổng kết nối:

| Data          | Type              |
| ------------- | ----------------- |
| `00 04 00 00` | DisplayPort       |
| `00 08 00 00` | HDMI              |
| `04 00 00 00` | Digital DVI       |
| `02 00 00 00` | LVDS (cho laptop) |
| `01 00 00 00` | Dummy port        |

Thực ra ta chỉ quan tâm tới HDMI và DP mà thôi!

### Chỉnh sửa framebuffer

WhateverGreen cung cấp cho ta công cụ để sửa các connection thông qua một số thuộc tính sau:

+ **framebuffer-conX-enable** (kích hoạt patch connection X)
+ framebuffer-conX-index
+ framebuffer-conX-busid
+ framebuffer-conX-pipe
+ framebuffer-conX-type
+ framebuffer-conX-flags
+ **framebuffer-conX-alldata** (tương đương 5 thuộc tính phía trên)

Với X là 0/1/2, nhưng không phải tương ứng với port 5,6,7 mà tương ứng với 3 bộ connnection trong framebuffer. Tức là bạn có thể dùng `con0` cho `port 6` tức `index 2`.

Mặc định framebuffer data gốc sẽ tương ứng với framebuffer-connection như sau:

```js
framebuffer-con0-alldata = 01050900 00040000 C7030000
framebuffer-con1-alldata = 02040A00 00040000 C7030000
framebuffer-con2-alldata = 03060800 00040000 C7030000
```

**Vâng thưa các bạn, cách làm để cho cổng HDMI xuất hình đó là đi thử tất cả các busid với từng connection hay gọi là thử tới chết!** Mỗi lần thử là một lần restart! Vì chúng ta chưa biết port nào gắn với type nào nên cứ cho mặc định port nào cũng là HDMI (đang sửa HDMI mà):

+ Bắt đầu với `con0`, chọn `busid` cho nó và thử đồng thời đặt `busid` của `con1` và `con2` thành `00`. Điền vào `DeviceProperteies -> Add -> PciRoot(0x0)/Pci(0x2,0x0)` như sau:

    | Key                      | Type | Value                        |
    | :----------------------- | :--- | :--------------------------- |
    | framebuffer-patch-enable | Data | `01000000`                   |
    | framebuffer-con0-enable  | Data | `01000000`                   |
    | framebuffer-con1-enable  | Data | `01000000`                   |
    | framebuffer-con2-enable  | Data | `01000000`                   |
    | framebuffer-con0-alldata | Data | `01010900 00080000 C7030000` |
    | framebuffer-con1-alldata | Data | `02000A00 00040000 C7030000` |
    | framebuffer-con2-alldata | Data | `03000800 00040000 C7030000` |

+ Thay đổi lần lượt `busid` của `con0` thành các giá trị khác mà được phép dùng cho HDMI:

    ```js
    framebuffer-con0-alldata = 01020900 00080000 C7030000
    framebuffer-con0-alldata = 01040900 00080000 C7030000 
    framebuffer-con0-alldata = 01050900 00080000 C7030000
    framebuffer-con0-alldata = 01060900 00080000 C7030000
    ```
+ Hãy thực hiện tương tự với `con1` và `con2` tới khi cổng HDMI xuất được hình!

:::danger
Xin lưu ý là luôn luôn phải có `framebuffer-patch-enable` = `01000000` nếu không mọi việc sửa đổi là vô nghĩa!
:::

:::info
Việc patch framebuffer thực sự cũng đơn giản chỉ việc thay busid và type, đúng cổng đúng type, busid phù hợp là sẽ xuất hình ra được!
:::

:::tip
Đối với laptop `con0` mặc định type là `LVDS` cho màn hình trong, đa số chỉ cần chỉnh `con1` và `con2` đúng `type` là xuất ra được! Cách làm tương tự như tôi đã trình bày trên!
:::

### Một số bộ patch framebuffer

Trong hướng dẫn sau đã có khá nhiều bộ framebuffer:[[GUIDE] General Framebuffer Patching Guide (HDMI Black Screen Problem)](https://www.tonymacx86.com/threads/guide-general-framebuffer-patching-guide-hdmi-black-screen-problem.269149/)

Ngoài ra, dựa vào kinh nghiệm cài rất nhiều máy, tôi xin chia sẻ một số bộ framebuffer khác đã được thử nghiệm:

+ **GIGABYTE**
	+ **DP + HDMI**：B360M AORUS PRO
		
		```js
    framebuffer-con0-alldata = 01050900 00040000 C7030000
    framebuffer-con2-alldata = 03040800 00080000 C7030000
    ```

+ **AsRock**
  + **DP + HDMI**：Z490 Steel Legend
    
		```js
    framebuffer-con1-alldata = 02020A00 00040000 C7030000
    framebuffer-con2-alldata = 03040800 00080000 C7030000 
    ```
	
	+ **DP + HDMI**：Z490 Extreme4
	
		```js
    framebuffer-con2-alldata = 03040800 00080000 C7030000
    ```

+ **ASUS**
  + **DP + HDMI**：ROG STRIX B460-I GAMING

		```js
    framebuffer-con0-alldata = 01060900 00040000 C7030000
		framebuffer-con1-alldata = 02040A00 00080000 C7030000
    ```
	
	+ **DP + HDMI**：Z170I PRO GAMING

		```js
		framebuffer-con0-alldata = 01050900 00080000 C7030000 
		```
	
	+ **DP + HDMI**：TUF GAMING B460M-PRO

    ```js
    framebuffer-con1-alldata = 02060A00 00080000 C7030000 
    ```

	+ **DP + HDMI**：TUF B360M-PLUS GAMING

    ```js
    framebuffer-con1-alldata = 02020A00 00080000 C7030000 
    ```
	
	+ **Laptop TUF FX504GE**: 

  	```js
  	framebuffer-con2-alldata =01050900 00080000 C7010000
  	```

+ **DELL**
  + **HDMI + VGA**：Vostro 3260 (100 Series)

    ```js
    AAPL,ig-platform-id = 00001259
    framebuffer-con0-alldata = 01050900 00080000 C7030000
    framebuffer-con1-alldata = 02000A00 00040000 C7030000 （VGA）
    ```
+ **MSI**
	+ **HDMI**：MAG B365M MORTAR

    ```js
    framebuffer-con0-alldata = 01050900 00080000 C7030000
    ```

	+ **DP + HDMI**：MPG Z390 GAMING PRO CARBON AC

    ```js
    framebuffer-con0-alldata = 01010900 00080000 C7030000 
    ```

	+ **DP + HDMI**：MAG B460M MORTAR
    
		```js
    framebuffer-con0-alldata = 01010800 00080000 C7030000
    ```

  + **DP + HDMI**：MEG Z490I UNIFY
    
		```js
    framebuffer-con0-alldata = 01010900 00080000 C7030000
    ```
