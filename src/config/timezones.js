const timezones = [
  {
    "value": "Dateline Standard Time",
    "abbr": "DST",
    "offset": -12,
    "isdst": false,
    "text": "(UTC-12:00) International Date Line West",
    "text-zh": "(UTC-12:00) 国际日期变更线西",
    "timezone": "Etc/GMT+12"
  },
  {
    "value": "UTC-11",
    "abbr": "U",
    "offset": -11,
    "isdst": false,
    "text": "(UTC-11:00) Coordinated Universal Time-11",
    "text-zh": "(UTC-11:00) 协调世界时-11",
    "timezone": "Etc/GMT+11"
  },
  {
    "value": "Hawaiian Standard Time",
    "abbr": "HST",
    "offset": -10,
    "isdst": false,
    "text": "(UTC-10:00) Hawaii",
    "text-zh": "(UTC-10:00) 夏威夷",
    "timezone": "Pacific/Honolulu"
  },
  {
    "value": "Alaskan Standard Time",
    "abbr": "AKDT",
    "offset": -9,
    "isdst": true,
    "text": "(UTC-09:00) Alaska",
    "text-zh": "(UTC-09:00) 法属波利尼西亚 甘比尔群岛",
    "timezone": "Pacific/Gambier"
  },
  {
    "value": "Pacific Standard Time (Mexico)",
    "abbr": "PDT",
    "offset": -8,
    "isdst": true,
    "text": "(UTC-08:00) Baja California",
    "text-zh": "(UTC-08:00) 下加利福尼亚州",
    "timezone": "America/Santa_Isabel"
  },    
  {
    "value": "Pacific Standard Time",
    "abbr": "PDT",
    "offset": -8,
    "isdst": true,
    "text": "(UTC-08:00) Pacific Time (US & Canada)",
    "text-zh": "(UTC-08:00) 太平洋时间（美国和加拿大）",
    "timezone": "America/Los_Angeles"
  },
  {
    "value": "US Mountain Standard Time",
    "abbr": "UMST",
    "offset": -7,
    "isdst": false,
    "text": "(UTC-07:00) Arizona",
    "text-zh": "(UTC-07:00) 亚利桑那",
    "timezone": "America/Phoenix"
  },
  {
    "value": "Mountain Standard Time",
    "abbr": "MDT",
    "offset": -7,
    "isdst": true,
    "text": "(UTC-07:00) Mountain Time (US & Canada)",
    "text-zh": "(UTC-07:00) 山地时间（美国和加拿大）",
    "timezone": "America/Denver"
  },
  {
    "value": "Central America Standard Time",
    "abbr": "CAST",
    "offset": -6,
    "isdst": false,
    "text": "(UTC-06:00) Central America",
    "text-zh": "(UTC-06:00) 中美洲",
    "timezone": "America/Guatemala"
  },
  {
    "value": "Central Standard Time",
    "abbr": "CDT",
    "offset": -6,
    "isdst": true,
    "text": "(UTC-06:00) Central Time (US & Canada)",
    "text-zh": "(UTC-06:00) 中部时间（美国和加拿大）",
    "timezone": "America/Chicago"
  },
  {
    "value": "Central Standard Time (Mexico)",
    "abbr": "CDT",
    "offset": -6,
    "isdst": true,
    "text": "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
    "text-zh": "(UTC-06:00) 瓜达拉哈拉,墨西哥城,蒙特雷",
    "timezone": "America/Mexico_City"
  },
  {
    "value": "Canada Central Standard Time",
    "abbr": "CCST",
    "offset": -6,
    "isdst": false,
    "text": "(UTC-06:00) Saskatchewan",
    "text-zh": "(UTC-06:00) 萨斯喀彻温",
    "timezone": "America/Regina"
  },
  {
    "value": "SA Pacific Standard Time",
    "abbr": "SPST",
    "offset": -5,
    "isdst": false,
    "text": "(UTC-05:00) Bogota, Lima, Quito",
    "text-zh": "(UTC-05:00) 波哥大,利马,基多",
    "timezone": "America/Bogota"
  },
  {
    "value": "Eastern Standard Time",
    "abbr": "EDT",
    "offset": -5,
    "isdst": true,
    "text": "(UTC-05:00) Eastern Time (US & Canada)",
    "text-zh": "(UTC-05:00) 东部时间（美国和加拿大）",
    "timezone": "America/New_York"
  },
  {
    "value": "US Eastern Standard Time",
    "abbr": "UEDT",
    "offset": -5,
    "isdst": true,
    "text": "(UTC-05:00) Indiana (East)",
    "text-zh": "(UTC-05:00) 印地安那州（东部）",
    "timezone": "America/Indiana/Indianapolis"
  },
  {
    "value": "Atlantic Standard Time",
    "abbr": "ADT",
    "offset": -4,
    "isdst": true,
    "text": "(UTC-04:00) Atlantic Time (Canada)",
    "text-zh": "(UTC-04:00) 大西洋时间（加拿大）",
    "timezone": "America/Halifax"
  },
  {
    "value": "Paraguay Standard Time",
    "abbr": "PST",
    "offset": -4,
    "isdst": false,
    "text": "(UTC-04:00) Asuncion",
    "text-zh": "(UTC-04:00) 亚松森",
    "timezone": "America/Asuncion"
  },
  {
    "value": "SA Western Standard Time",
    "abbr": "SWST",
    "offset": -4,
    "isdst": false,
    "text": "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
    "text-zh": "(UTC-04:00) 乔治敦,拉巴斯,马瑙斯,圣胡安",
    "timezone": "America/La_Paz"
  },
  {
    "value": "Central Brazilian Standard Time",
    "abbr": "CBST",
    "offset": -4,
    "isdst": false,
    "text": "(UTC-04:00) Cuiaba",
    "text-zh": "(UTC-04:00) 库亚巴",
    "timezone": "America/Cuiaba"
  },
  {
    "value": "Newfoundland Standard Time",
    "abbr": "NDT",
    "offset": -3.5,
    "isdst": true,
    "text": "(UTC-03:30) Newfoundland",
    "text-zh": "(UTC-03:30) 纽芬兰",
    "timezone": "America/St_Johns"
  },
  {
    "value": "E. South America Standard Time",
    "abbr": "ESAST",
    "offset": -3,
    "isdst": false,
    "text": "(UTC-03:00) Brasilia",
    "text-zh": "(UTC-03:00) 巴西利亚",
    "timezone": "America/Sao_Paulo"
  },
  {
    "value": "Argentina Standard Time",
    "abbr": "AST",
    "offset": -3,
    "isdst": false,
    "text": "(UTC-03:00) Buenos Aires",
    "text-zh": "(UTC-03:00) 布宜诺斯艾利斯",
    "timezone": "America/Argentina/Buenos_Aires"
  },
  {
    "value": "Greenland Standard Time",
    "abbr": "GDT",
    "offset": -3,
    "isdst": true,
    "text": "(UTC-03:00) Greenland",
    "text-zh": "(UTC-03:00) 格陵兰",
    "timezone": "America/Godthab"
  },
  {
    "value": "SA Eastern Standard Time",
    "abbr": "SEST",
    "offset": -3,
    "isdst": false,
    "text": "(UTC-03:00) Cayenne, Fortaleza",
    "text-zh": "(UTC-03:00) 卡宴,福塔雷萨",
    "timezone": "America/Cayenne"
  },
  {
    "value": "Montevideo Standard Time",
    "abbr": "MST",
    "offset": -3,
    "isdst": false,
    "text": "(UTC-03:00) Montevideo",
    "text-zh": "(UTC-03:00) 蒙得维的亚",
    "timezone": "America/Montevideo"
  },
  {
    "value": "UTC-02",
    "abbr": "U",
    "offset": -2,
    "isdst": false,
    "text": "(UTC-02:00) Coordinated Universal Time-02",
    "text-zh": "(UTC-02:00) 协调世界时-2",
    "timezone": "Etc/GMT+2"
  },
  {
    "value": "Azores Standard Time",
    "abbr": "ADT",
    "offset": -1,
    "isdst": true,
    "text": "(UTC-01:00) Azores",
    "text-zh": "(UTC-01:00) 亚速尔群岛",
    "timezone": "Atlantic/Azores"
  },
  {
    "value": "Morocco Standard Time",
    "abbr": "MDT",
    "offset": 0,
    "isdst": true,
    "text": "(UTC) Casablanca",
    "text-zh": "(UTC+00:00) 卡萨布兰卡",
    "timezone": "Africa/Casablanca"
  },
  {
    "value": "Greenwich Standard Time",
    "abbr": "GST",
    "offset": 0,
    "isdst": false,
    "text": "(UTC) Monrovia, Reykjavik",
    "text-zh": "(UTC+00:00) 蒙罗维亚,雷克雅未克",
    "timezone": "Atlantic/Reykjavik"
  },
  {
    "value": "UTC",
    "abbr": "CUT",
    "offset": 0,
    "isdst": false,
    "text": "(UTC) Coordinated Universal Time",
    "text-zh": "(UTC+00:00) 协调世界时",
    "timezone": "Etc/GMT"
  },
  {
    "value": "W. Europe Standard Time",
    "abbr": "WEDT",
    "offset": 1,
    "isdst": true,
    "text": "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
    "text-zh": "(UTC+01:00) 阿姆斯特丹，柏林，伯尔尼，罗马，斯德哥尔摩，维也纳",
    "timezone": "Europe/Berlin"
  },
  {
    "value": "Romance Standard Time",
    "abbr": "RDT",
    "offset": 1,
    "isdst": true,
    "text": "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
    "text-zh": "(UTC+01:00) 布鲁塞尔，哥本哈根，马德里，巴黎",
    "timezone": "Europe/Paris"
  },
  {
    "value": "W. Central Africa Standard Time",
    "abbr": "WCAST",
    "offset": 1,
    "isdst": false,
    "text": "(UTC+01:00) West Central Africa",
    "text-zh": "(UTC+01:00) 中非西部",
    "timezone": "Africa/Lagos"
  },
  {
    "value": "Central Europe Standard Time",
    "abbr": "CEDT",
    "offset": 1,
    "isdst": true,
    "text": "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
    "text-zh": "(UTC+01:00) 贝尔格莱德，布拉迪斯拉发，布达佩斯，卢布尔雅那，布拉格",
    "timezone": "Europe/Budapest"
  },
  {
    "value": "Central European Standard Time",
    "abbr": "CEDT",
    "offset": 1,
    "isdst": true,
    "text": "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
    "text-zh": "(UTC+01:00) 萨拉热窝，斯科普里，华沙，萨格勒布",
    "timezone": "Europe/Warsaw"
  },
  {
    "value": "GTB Standard Time",
    "abbr": "GDT",
    "offset": 2,
    "isdst": true,
    "text": "(UTC+02:00) Athens, Bucharest, Istanbul",
    "text-zh": "(UTC+02:00) 雅典，布加勒斯特，伊斯坦布尔",
    "timezone": "Europe/Istanbul"
  },
  {
    "value": "Egypt Standard Time",
    "abbr": "EST",
    "offset": 2,
    "isdst": false,
    "text": "(UTC+02:00) Cairo",
    "text-zh": "(UTC+02:00) 开罗",
    "timezone": "Africa/Cairo"
  },
  {
    "value": "Syria Standard Time",
    "abbr": "SDT",
    "offset": 2,
    "isdst": true,
    "text": "(UTC+02:00) Damascus",
    "text-zh": "(UTC+02:00) 大马士革",
    "timezone": "Asia/Damascus"
  },    {
    "value": " Standard Time",
    "abbr": "JST",
    "offset": 2,
    "isdst": false,
    "text": "(UTC+03:00) Amman",
    "text-zh": "(UTC+02:00) 安曼",
    "timezone": "Asia/Amman"
  },
  {
    "value": "South Africa Standard Time",
    "abbr": "SAST",
    "offset": 2,
    "isdst": false,
    "text": "(UTC+02:00) Harare, Pretoria",
    "text-zh": "(UTC+02:00) 哈拉雷，比勒陀利亚",
    "timezone": "Africa/Johannesburg"
  },    
  {
    "value": "Israel Standard Time",
    "abbr": "JDT",
    "offset": 2,
    "isdst": true,
    "text": "(UTC+02:00) Jerusalem",
    "text-zh": "(UTC+02:00) 耶路撒冷",
    "timezone": "Asia/Jerusalem"
  },
  {
    "value": "Middle East Standard Time",
    "abbr": "MEDT",
    "offset": 2,
    "isdst": true,
    "text": "(UTC+02:00) Beirut",
    "text-zh": "(UTC+02:00) 贝鲁特",
    "timezone": "Asia/Beirut"
  },
  {
    "value": "Arabic Standard Time",
    "abbr": "AST",
    "offset": 3,
    "isdst": false,
    "text": "(UTC+03:00) Baghdad",
    "text-zh": "(UTC+03:00) 巴格达",
    "timezone": "Asia/Baghdad"
  },
  {
    "value": "Kaliningrad Standard Time",
    "abbr": "KST",
    "offset": 3,
    "isdst": false,
    "text": "(UTC+03:00) Kaliningrad, Minsk",
    "text-zh": "(UTC+03:00) 明斯克",
    "timezone": "Europe/Minsk"
  },
  {
    "value": "Arab Standard Time",
    "abbr": "AST",
    "offset": 3,
    "isdst": false,
    "text": "(UTC+03:00) Kuwait, Riyadh",
    "text-zh": "(UTC+03:00) 利雅得",
    "timezone": "Asia/Riyadh"
  },
  {
    "value": "E. Africa Standard Time",
    "abbr": "EAST",
    "offset": 3,
    "isdst": false,
    "text": "(UTC+03:00) Nairobi",
    "text-zh": "(UTC+03:00) 内罗毕",
    "timezone": "Africa/Nairobi"
  },
  {
    "value": "Iran Standard Time",
    "abbr": "IDT",
    "offset": 3.5,
    "isdst": true,
    "text": "(UTC+03:30) Tehran",
    "text-zh": "(UTC+03:30) 德黑兰",
    "timezone": "Asia/Tehran"
  },
  {
    "value": "Russian Standard Time",
    "abbr": "RST",
    "offset": 4,
    "isdst": false,
    "text": "(UTC+04:00) Moscow, St. Petersburg, Volgograd",
    "text-zh": "(UTC+04:00) 莫斯科，圣彼得堡，伏尔加格勒",
    "timezone": "Europe/Moscow"
  },
  {
    "value": "Georgian Standard Time",
    "abbr": "GST",
    "offset": 4,
    "isdst": false,
    "text": "(UTC+04:00) Tbilisi",
    "text-zh": "(UTC+04:00) 第比利斯",
    "timezone": "Asia/Tbilisi"
  },
  {
    "value": "Caucasus Standard Time",
    "abbr": "CST",
    "offset": 4,
    "isdst": false,
    "text": "(UTC+04:00) Yerevan",
    "text-zh": "(UTC+04:00) 埃里温",
    "timezone": "Asia/Yerevan"
  },
  {
    "value": "Arabian Standard Time",
    "abbr": "AST",
    "offset": 4,
    "isdst": false,
    "text": "(UTC+04:00) Abu Dhabi, Muscat",
    "text-zh": "(UTC+04:00) 阿布扎比，马斯喀特",
    "timezone": "Asia/Dubai"
  },
  {
    "value": "Azerbaijan Standard Time",
    "abbr": "ADT",
    "offset": 4,
    "isdst": true,
    "text": "(UTC+04:00) Baku",
    "text-zh": "(UTC+04:00) 巴库",
    "timezone": "Asia/Baku"
  },
  {
    "value": "Mauritius Standard Time",
    "abbr": "MST",
    "offset": 4,
    "isdst": false,
    "text": "(UTC+04:00) Port Louis",
    "text-zh": "(UTC+04:00) 路易港",
    "timezone": "Indian/Mauritius"
  },
  {
    "value": "Afghanistan Standard Time",
    "abbr": "AST",
    "offset": 4.5,
    "isdst": false,
    "text": "(UTC+04:30) Kabul",
    "text-zh": "(UTC+04:30) 喀布尔",
    "timezone": "Asia/Kabul"
  },
  {
    "value": "Pakistan Standard Time",
    "abbr": "PST",
    "offset": 5,
    "isdst": false,
    "text": "(UTC+05:00) Islamabad, Karachi",
    "text-zh": "(UTC+05:00) 伊斯兰堡，卡拉奇",
    "timezone": "Asia/Karachi"
  },
  {
    "value": "Sri Lanka Standard Time",
    "abbr": "SLST",
    "offset": 5.5,
    "isdst": false,
    "text": "(UTC+05:30) Sri Jayawardenepura",
    "text-zh": "(UTC+05:30) 斯里加亚渥登普拉",
    "timezone": "Asia/Colombo"
  },
  {
    "value": "India Standard Time",
    "abbr": "IST",
    "offset": 5.5,
    "isdst": false,
    "text": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    "text-zh": "(UTC+05:30) 钦奈，加尔各答，孟买，新德里",
    "timezone": "Asia/Kolkata"
  },
  {
    "value": "Central Asia Standard Time",
    "abbr": "CAST",
    "offset": 6,
    "isdst": false,
    "text": "(UTC+06:00) Astana",
    "text-zh": "(UTC+06:00) 阿斯塔纳",
    "timezone": "Asia/Almaty"
  },
  {
    "value": "Bangladesh Standard Time",
    "abbr": "BST",
    "offset": 6,
    "isdst": false,
    "text": "(UTC+06:00) Dhaka",
    "text-zh": "(UTC+06:00) 达卡",
    "timezone": "Asia/Dhaka"
  },
  {
    "value": "SE Asia Standard Time",
    "abbr": "SAST",
    "offset": 7,
    "isdst": false,
    "text": "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    "text-zh": "(UTC+07:00) 曼谷，河内，雅加达",
    "timezone": "Asia/Bangkok"
  },
  {
    "value": "N. Central Asia Standard Time",
    "abbr": "NCAST",
    "offset": 7,
    "isdst": false,
    "text": "(UTC+07:00) Novosibirsk",
    "text-zh": "(UTC+07:00) 新西伯利亚",
    "timezone": "Asia/Novosibirsk"
  },
  {
    "value": "China Standard Time",
    "abbr": "CST",
    "offset": 8,
    "isdst": false,
    "text": "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
    "text-zh": "(UTC+08:00) 北京，重庆，中国香港，乌鲁木齐",
    "timezone": "Asia/Shanghai"
  },
  {
    "value": "W. Australia Standard Time",
    "abbr": "WAST",
    "offset": 8,
    "isdst": false,
    "text": "(UTC+08:00) Perth",
    "text-zh": "(UTC+08:00) 佩思",
    "timezone": "Australia/Perth"
  },
  {
    "value": "Taipei Standard Time",
    "abbr": "TST",
    "offset": 8,
    "isdst": false,
    "text": "(UTC+08:00) Taipei",
    "text-zh": "(UTC+08:00) 台北",
    "timezone": "Asia/Taipei"
  },
  {
    "value": "Korea Standard Time",
    "abbr": "KST",
    "offset": 9,
    "isdst": false,
    "text": "(UTC+09:00) Seoul",
    "text-zh": "(UTC+09:00) 首尔",
    "timezone": "Asia/Seoul"
  },
  {
    "value": "Tokyo Standard Time",
    "abbr": "TST",
    "offset": 9,
    "isdst": false,
    "text": "(UTC+09:00) Osaka, Sapporo, Tokyo",
    "text-zh": "(UTC+09:00) 大阪，札幌，东京",
    "timezone": "Asia/Tokyo"
  },
  {
    "value": "AUS Central Standard Time",
    "abbr": "ACST",
    "offset": 9.5,
    "isdst": false,
    "text": "(UTC+09:30) Darwin",
    "text-zh": "(UTC+09:30) 达尔文",
    "timezone": "Australia/Darwin"
  },
  {
    "value": "Cen. Australia Standard Time",
    "abbr": "CAST",
    "offset": 9.5,
    "isdst": false,
    "text": "(UTC+09:30) Adelaide",
    "text-zh": "(UTC+09:30) 阿德莱德",
    "timezone": "Australia/Adelaide"
  },
  {
    "value": "E. Australia Standard Time",
    "abbr": "EAST",
    "offset": 10,
    "isdst": false,
    "text": "(UTC+10:00) Brisbane",
    "text-zh": "(UTC+10:00) 布里斯班",
    "timezone": "Australia/Brisbane"
  },
  {
    "value": "West Pacific Standard Time",
    "abbr": "WPST",
    "offset": 10,
    "isdst": false,
    "text": "(UTC+10:00) Guam, Port Moresby",
    "text-zh": "(UTC+10:00) 关岛，莫尔兹比港",
    "timezone": "Pacific/Port_Moresby"
  },
  {
    "value": "AUS Eastern Standard Time",
    "abbr": "AEST",
    "offset": 10,
    "isdst": false,
    "text": "(UTC+10:00) Canberra, Melbourne, Sydney",
    "text-zh": "(UTC+10:00) 堪培拉，墨尔本，悉尼",
    "timezone": "Australia/Sydney"
  },
  {
    "value": "Central Pacific Standard Time",
    "abbr": "CPST",
    "offset": 11,
    "isdst": false,
    "text": "(UTC+11:00) Solomon Is., New Caledonia",
    "text-zh": "(UTC+11:00) 所罗门群岛，新喀里多尼亚",
    "timezone": "Pacific/Guadalcanal"
  },
  {
    "value": "UTC+12",
    "abbr": "U",
    "offset": 12,
    "isdst": false,
    "text": "(UTC+12:00) Coordinated Universal Time+12",
    "text-zh": "(UTC+12:00) 协调世界时+12",
    "timezone": "Etc/GMT-12"
  },
  {
    "value": "Fiji Standard Time",
    "abbr": "FST",
    "offset": 12,
    "isdst": false,
    "text": "(UTC+12:00) Fiji",
    "text-zh": "(UTC+12:00) 斐济，马绍尔群岛",
    "timezone": "Pacific/Fiji"
  },
  {
    "value": "New Zealand Standard Time",
    "abbr": "NZST",
    "offset": 12,
    "isdst": false,
    "text": "(UTC+12:00) Auckland, Wellington",
    "text-zh": "(UTC+12:00) 奥克兰，惠灵顿",
    "timezone": "Pacific/Auckland"
  },
  {
    "value": "Tonga Standard Time",
    "abbr": "TST",
    "offset": 13,
    "isdst": false,
    "text": "(UTC+13:00) Nuku'alofa",
    "text-zh": "(UTC+13:00) 努库阿洛法",
    "timezone": "Pacific/Tongatapu"
  },
  {
    "value": "Samoa Standard Time",
    "abbr": "SST",
    "offset": 13,
    "isdst": false,
    "text": "(UTC+13:00) Samoa",
    "text-zh": "(UTC+13:00) 萨摩亚群岛",
    "timezone": "Pacific/Apia"
  },
  {
    "value": "Line Islands Standard Time",
    "abbr": "LINT",
    "offset": 14,
    "isdst": false,
    "text": "(UTC+14:00) Line Islands",
    "text-zh": "(UTC+14:00) 莱恩群岛",
    "timezone": "Pacific/Kiritimati"
  }
];
export {
  timezones
}