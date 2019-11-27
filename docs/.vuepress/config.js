module.exports = {
    // 基准URL
    base: '/',
    // host
    host: '0.0.0.0',
    // port
    port: 8080,
    // 网站的标题
    title: 'Alita UI',
    // 网站描述
    description: '一套基于Taro框架开发的移动端跨平台UI组件库',
    // head
    head: [
        ['link', { rel: 'icon', href: 'favicon.ico'}]
    ],
    themeConfig: {
        // 侧边栏显示2级
        sidebarDepth: 1, 
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: 'Git EditLink',
        // 文档更新时间：每个文件git最后提交的时间,
        lastUpdated: 'Last Updated' ,
        nav:[ // 导航栏配置
            // {text: '首页', link: '/' },
            // {text: 'Alita-UI', link: '/alita-ui/'},
            // {text: '参与贡献', link: 'https://baidu.com'},
            { text: '主页', link: '/' }, // 导航条
            { text: '组件', link: '/alita-ui/' },
            { text: '知识库', link: '/knowledge/' },
            { text: 'github',        // 这里是下拉列表展现形式。
                items: [
                { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
                { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
                ]
            }    
        ],
        // 侧边栏配置
        sidebar: [
            {
                title: '指南',
                collapsable: false,
                children: [
                  '/alita-ui/',
                  '/alita-ui/p-getting-start',
                  '/alita-ui/p-theme-config',
                //   '/pages/change-log',
                  '/alita-ui/p-contribution',
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                  '/alita-ui/c-button',
                  '/alita-ui/c-checkbox',
                  '/alita-ui/c-tabs',
                  '/alita-ui/c-link',
                  '/alita-ui/c-list',
                  '/alita-ui/c-sticker'
                ]
            }
        ],
        footer: {
            contact: [
              {
                type: 'github',
                link: 'https://github.com/vuejs/vuepress',
              },
              {
                type: 'twitter',
                link: 'https://github.com/vuejs/vuepress',
              },
            ],
          }
    },
    configureWebpack: {
        resolve: {
            alias: {
            '@assets': '../assets'
            }
        }
    },
    markdown: {
            // markdown-it-anchor 的选项
        anchor: { permalink: false },
        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 2] },
        config: md => {
          md.set({ breaks: true })
          md.use(require('markdown-it-xxx'))
        }
    }
}