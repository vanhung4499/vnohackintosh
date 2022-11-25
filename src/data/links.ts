export interface Website {
  name: string;
  logo: string;
  desc?: string;
  href: string;
  tags?: string[];
}

export interface WebsiteCategory {
  name: string;
  websites: Website[];
}

export const websiteData: WebsiteCategory[] = [
  {
    name: "VNOH",
    websites: [
      {
        name: "VNOHackintosh",
        desc: "Facebook Page",
        logo: "https://www.svgrepo.com/show/111203/facebook.svg",
        href: "https://www.facebook.com/vnohackintosh/",
        tags: [""],
      },
      {
        name: "VNOHackintosh",
        desc: "Facebook Group",
        logo: "https://www.svgrepo.com/show/111203/facebook.svg",
        href: "https://www.facebook.com/groups/vnohackintosh/",
        tags: [""],
      },
      {
        name: "VNOHackintosh",
        desc: "Telegram grouup",
        logo: "https://www.svgrepo.com/show/354443/telegram.svg",
        href: "",
        tags: [""],
      },
      {
        name: "vnohackintosh.com",
        desc: "Hackintosh website",
        logo: "https://www.svgrepo.com/show/75888/apple.svg",
        href: "https://vnohackintosh.com/",
        tags: [""],
      },
    ],
  },
  {
    name: "Guide",
    websites: [
      {
        name: "Dortanina",
        desc: "Hackintosh guides",
        logo: "https://dortania.github.io/OpenCore-Install-Guide/homepage.png",
        href: "https://dortania.github.io/OpenCore-Install-Guide/",
        tags: [""],
      },
      {
        name: "InsanelyMac",
        desc: "Hackintosh forum",
        logo: "https://www.insanelymac.com/uploads/monthly_2021_01/insanelymac-logo-2016.png.2e0d3a0ed147b6acb2d781cea3ec24b7.png",
        href: "https://www.insanelymac.com",
        tags: [""],
      },
      {
        name: "tonymacx86",
        desc: "Hackintosh forum",
        logo: "https://www.tonymacx86.com/images/misc/newlogo.png",
        href: "https://www.tonymacx86.com/",
        tags: [""],
      },
      {
        name: "osxlatitude",
        desc: "Hackintosh forum",
        logo: "https://osxlatitude.com/uploads/monthly_2020_12/osxl.png.f5f17ca793a2b83d6a0d88355e456d77.png",
        href: "https://osxlatitude.com/",
        tags: [""],
      },
    ],
  },
  {
    name: "Kexts",
    websites: [
      {
        name: "LiLu",
        desc: "Core Kext",
        logo: "https://avatars.githubusercontent.com/u/39672954",
        href: "https://github.com/acidanthera/Lilu",
        tags: [""],
      },
      {
        name: "AppleALC",
        desc: "Audio Kext",
        logo: "https://avatars.githubusercontent.com/u/39672954",
        href: "https://github.com/acidanthera/AppleALC",
        tags: [""],
      },
      {
        name: "WhateverGreen",
        desc: "Graphic Kext",
        logo: "https://avatars.githubusercontent.com/u/39672954",
        href: "https://github.com/acidanthera/WhateverGreen",
        tags: [""],
      },
      {
        name: "VirtualSMC",
        desc: "Core Kext",
        logo: "https://avatars.githubusercontent.com/u/39672954",
        href: "https://github.com/acidanthera/VirtualSMC",
        tags: [""],
      },
    ],
  },
  {
    name: "Tools",
    websites: [
      {
        name: "Hackintool",
        desc: "The Swiss army knife of vanilla Hackintoshing",
        logo: "https://www.insanelymac.com/uploads/monthly_2020_03/Icon-256.png.9620558ea601f301b5834a6a84e6f620.png",
        href: "https://github.com/headkaze/Hackintool",
        tags: [""],
      },
    ],
  },
];
