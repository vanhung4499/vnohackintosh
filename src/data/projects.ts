export interface Computer {
  brand: string;
  name?: string;
  motherboard: string;
  cpu: string;
  igpu?: string;
  dgpu?: string;
  lan?: string;
  wifi?: string;
  ram: string;
  os: string;
  href: string;
  tags?: string[];
}

export interface ComputerCategory {
  name: string;
  computers: Computer[];
}

export const computerData: ComputerCategory[] = [
  {
    name: "PC",
    computers: [
      {
        brand: "Gigabyte",
        motherboard: "B460M Aorus Pro",
        cpu: "i5-10400",
        igpu: "Intel UHD 630",
        dgpu: "AMD RX 6600XT",
        lan: "Intel I219",
        wifi: "Intel AX200",
        ram: "16GB DDR4 3200Mhz",
        os: "macOS Monterey 12.6",
        href: "",
        tags: ['gigabyte', 'b460']
      },
      {
        brand: "Gigabyte",
        motherboard: "B460M Aorus Pro",
        cpu: "i5-10400",
        igpu: "Intel UHD 630",
        dgpu: "AMD RX 6600XT",
        lan: "Intel I219",
        wifi: "Intel AX200",
        ram: "16GB DDR4 3200Mhz",
        os: "macOS Monterey 12.6",
        href: "",
        tags: ['gigabyte', 'b460']
      },
      {
        brand: "Gigabyte",
        motherboard: "B460M Aorus Pro",
        cpu: "i5-10400",
        igpu: "Intel UHD 630",
        dgpu: "AMD RX 6600XT",
        lan: "Intel I219",
        wifi: "Intel AX200",
        ram: "16GB DDR4 3200Mhz",
        os: "macOS Monterey 12.6",
        href: "",
        tags: ['gigabyte', 'b460']
      }
    ]
  }
]