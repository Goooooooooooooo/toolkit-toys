import Toolkits from '@/components/Toolkits.vue'
import PasswordNote from '@/components/PasswordNote.vue'
import Calendar from '@/components/Calendar.vue'
import PasswordGenerator from '@/components/tools/PasswordGenerator.vue'
import NanoidGenerator from '@/components/tools/NanoidGenerator.vue'
import TimestampConvert from '@/components/tools/TimestampConvert.vue'
import JsonFormatter from '@/components/tools/JsonFormatter.vue'
import SqlFormatter from '@/components/tools/SqlFormatter.vue'
import Cronparser from '@/components/tools/Cronparser.vue'
import Settings from '@/components/Settings.vue'
import Todos from '@/components/Todos.vue'

export interface MenuItem {
    parentPath?: string, // 父级菜单 Path
    name: string,
    path: string,
    comment: string,
    icon: string,
    component: string,
    isActive: false,
    submenu: MenuItem[]
}

const TCMAP = {
    'AllTools': Toolkits,
    'Toolkits': Toolkits,
    'PasswordNote': PasswordNote,
    'Calendar': Calendar,
    'PasswordGenerator': PasswordGenerator,
    'NanoidGenerator': NanoidGenerator,
    'TimestampConvert': TimestampConvert,
    'JsonFormatter': JsonFormatter,
    'SqlFormatter': SqlFormatter,
    'Cronparser': Cronparser,
    'Settings': Settings,
    'Todos': Todos
};

const tool_converters:MenuItem = {
    name: 'Converters',
    path: 'tool-converters',
    icon: 'mdi-account-convert',
    component: 'Toolkits',
    comment: '',
    submenu: [
        // {
        //     name: 'JSON <> YAML',
        //     component: 'Settings',
        //     icon: 'mdi-circle',
        //     path: 'tood-list',
        //     comment: '',
        //     submenu: []
        // },
        {
            name: 'Timestamp',
            path: 'timestamp',
            component: 'TimestampConvert',
            icon: 'mdi-white-balance-sunny',
            submenu: [],
            comment: '',
            isActive: false,
            parentPath: 'tool-converters'
        },
        // {
        //     name: 'Number Base',
        //     component: '',
        //     icon: 'mdi-numeric',
        // },
        {
            name: 'Cron Expression',
            path: 'cron-expression',
            component: 'Cronparser',
            icon: 'mdi-clock-outline',
            submenu: [],
            comment: '',
            isActive: false,
            parentPath: 'tool-converters'
        },
    ],
    isActive: false
};
const tool_encode_decoder:MenuItem = {
    name: 'Encoders / Decoders',
    path: 'tool-encoders-decoders',
    icon: 'mdi-numeric-0-box-multiple-outline',
    component: 'Toolkits',
    comment: '',
    submenu: [
        {
            name: 'Certificate',
            path: 'certificate',
            component: '',
            icon: 'mdi-circle',
            submenu: [],
            comment: '',
            isActive: false
        },
        {
            name: 'HTML',
            path: 'html',
            component: '',
            icon: 'mdi-plus-outline',
            submenu: [],
            comment: '',
            isActive: false
        },
        {
            name: 'URL',
            path: 'url',
            component: '',
            icon: 'mdi-account',
            submenu: [],
            comment: '',
            isActive: false
        },
        {
            name: 'Base64 Text',
            component: '',
            icon: 'mdi-flag',
            submenu: [],
            path: '',
            comment: '',
            isActive: false
        },
        {
            name: 'Base64 Image',
            component: '',
            icon: 'mdi-flag',
            submenu: [],
            path: '',
            comment: '',
            isActive: false
        },
        {
            name: 'Gzip',
            component: '',
            icon: 'mdi-flag',
            submenu: [],
            path: '',
            comment: '',
            isActive: false
        },
        {
            name: 'JWT',
            component: '',
            icon: 'mdi-flag',
            submenu: [],
            path: '',
            comment: '',
            isActive: false
        },
    ],
    isActive: false
};;
const tool_formatters:MenuItem = {
    name: 'Formatters',
    path: 'tool-formatters',
    icon: 'mdi-format-text-rotation-down-vertical',
    component: 'Toolkits',
    comment: '',
    submenu: [
        {
            name: 'JSON',
            path: 'json-formatter',
            component: 'JsonFormatter',
            icon: 'mdi-code-json',
            comment: '',
            submenu: [],
            isActive: false,
            parentPath: 'tool-formatters'
        },
        {
            name: 'SQL',
            path: 'sql-formatter',
            component: 'SqlFormatter',
            icon: 'mdi-database-search',
            comment: '',
            submenu: [],
            isActive: false,
            parentPath: 'tool-formatters'
        },
        // {
        //     name: 'XML',
        //     path: 'xml',
        //     component: '',
        //     icon: 'mdi-account',
        // }
    ],
    isActive: false
};;
const tool_generators:MenuItem = {
    name: 'Generators',
    path: 'tool-generators',
    icon: 'mdi-generator-mobile',
    component: 'Toolkits',
    comment: '',
    submenu: [
        // {
        //     name: 'Hash',
        //     component: '',
        //     icon: 'mdi-fingerprint',
        // },
        {
            name: 'Password Generator',
            path: 'password-generator',
            component: 'PasswordGenerator',
            icon: 'mdi-key-outline',
            submenu: [],
            comment: '',
            isActive: false,
            parentPath: 'tool-generators'
        },
        {
            name: 'Nanoid',
            path: 'nanoid-generator',
            component: 'NanoidGenerator',
            icon: 'mdi-identifier',
            submenu: [],
            comment: '',
            isActive: false,
            parentPath: 'tool-generators'
        },
        // {
        //     name: 'Lorem Ipsum',
        //     path: '',
        //     component: '',
        //     icon: 'mdi-flag',
        //     submenu: []
        // },        
        // {
        //     name: 'Checksum',
        //     component: '',
        //     icon: 'mdi-flag',
        // },
    ],
    isActive: false
};;
const tool_text:MenuItem = {
    name: 'Text',
    path: '',
    icon: 'mdi-text',
    component: 'Toolkits',
    comment: '',
    submenu: [
        {
            name: 'Escape / Unescape',
            component: '',
            icon: 'mdi-circle',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'Inspector & Case Converter',
            component: '',
            icon: 'mdi-plus-outline',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'Regex Tester',
            component: '',
            icon: 'mdi-account',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'Text Diff',
            component: '',
            icon: 'mdi-flag',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
    ],
    isActive: false
};
const tool_graphic:MenuItem = {
    name: 'Graphic',
    icon: 'mdi-image-multiple',
    component: 'Toolkits',
    submenu: [
        {
            name: 'Color Blindness Simulator',
            component: '',
            icon: 'mdi-circle',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'Color Picker & Contrast',
            component: '',
            icon: 'mdi-plus-outline',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'PNG / JPEG Compressor',
            component: '',
            icon: 'mdi-account',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
        {
            name: 'Image Converter',
            component: '',
            icon: 'mdi-flag',
            path: '',
            comment: '',
            submenu: [],
            isActive: false
        },
    ],
    path: '',
    comment: '',
    isActive: false
};

let TOOL_BOOKMARKS:MenuItem[] = [
    {
        name: 'All Tools',
        path: 'all-tools',
        icon: 'mdi-home',
        component: 'AllTools',
        submenu: [],
        comment: '',
        isActive: false
    },
    {
        name: 'Todos',
        path: 'todos',
        icon: 'mdi-checkbox-marked-circle-auto-outline',
        component: 'Todos',
        submenu: [],
        comment: '',
        isActive: false
    },
    {
        name: 'Password Note',
        path: 'password-note',
        icon: 'mdi-lock',
        component: 'PasswordNote',
        submenu: [],
        comment: '',
        isActive: false
    },
    {
        name: 'Calendar',
        path: 'calendar',
        icon: 'mdi-calendar-month',
        component: 'Calendar',
        submenu: [],
        comment: '',
        isActive: false
    }
]

const TOOL_MENUS = [
    tool_generators,
    tool_converters,
    // tool_encode_decoder,
    tool_formatters,
    // tool_text,
    // tool_graphic
]

export {
    TCMAP,
    TOOL_MENUS,
    TOOL_BOOKMARKS
}