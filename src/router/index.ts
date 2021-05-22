import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */

Vue.use(VueRouter)

/*
  Note: sub-menu only appear when children.length>=1
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/contacts',
    component: Layout,
    redirect: '/contacts/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/contacts/index.vue'),
        name: 'Contacts',
        meta: {
          title: 'contacts',
          icon: 'user',
          noCache: true
        }
      },
      {
        path: '/contacts/:id/show',
        component: () => import('@/views/contacts/show.vue'),
        name: 'ContactView',
        meta: {
          noCache: true,
          title: 'contact',
          icon: 'user',
          hidden: true
        }
      },
      {
        path: '/contacts/:id/edit',
        component: () => import('@/views/contacts/edit.vue'),
        name: 'ContactEdit',
        meta: {
          noCache: true,
          title: 'contact',
          icon: 'user',
          hidden: true
        }
      },
      {
        path: '/contacts/new',
        component: () => import('@/views/contacts/new.vue'),
        name: 'ContactCreate',
        meta: {
          noCache: true,
          title: 'contact',
          icon: 'user',
          hidden: true
        }
      },
      {
        path: 'import-contacts',
        component: () => import('@/views/contacts/import-contacts.vue'),
        name: 'UploadContacts',
        meta: {
          noCache: true,
          title: 'uploadContacts',
          icon: 'user',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/campaigns',
    component: Layout,
    redirect: '/campaigns/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/campaigns/index.vue'),
        name: 'Campaigns',
        meta: {
          title: 'campaigns',
          icon: 'campaign'
        }
      },
      {
        path: '/campaigns/:id/show',
        component: () => import('@/views/campaigns/show.vue'),
        name: 'CampaignView',
        meta: {
          noCache: true,
          title: 'campaign',
          icon: 'campaign',
          hidden: true
        }
      },
      {
        path: '/campaigns/:id/edit',
        component: () => import('@/views/campaigns/edit.vue'),
        name: 'CampaignEdit',
        meta: {
          noCache: true,
          title: 'campaign',
          icon: 'campaign',
          hidden: true
        }
      },
      {
        path: '/campaigns/new',
        component: () => import('@/views/campaigns/new.vue'),
        name: 'CampaignCreate',
        meta: {
          noCache: true,
          title: 'campaign',
          icon: 'campaign',
          hidden: true
        }
      },
      {
        path: 'import-campaigns',
        component: () => import('@/views/campaigns/import-campaigns.vue'),
        name: 'UploadCampaigns',
        meta: {
          noCache: true,
          title: 'uploadCampaigns',
          icon: 'campaign',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/campaign/recipients',
    component: Layout,
    meta: { hidden: true },
    redirect: 'campaign/recipients/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/recipients/index.vue'),
        name: 'Recipients',
        meta: {
          noCache: true,
          title: 'recipients',
          hidden: true
        }
      },
      {
        path: '/new',
        component: () => import('@/views/recipients/new.vue'),
        name: 'RecipientCreate',
        meta: {
          noCache: true,
          title: 'recipient',
          hidden: true
        }
      },
      {
        path: '/campaign/:campaignId/recipients/chat',
        component: () => import('@/views/recipients/chat.vue'),
        name: 'RecipientChat',
        meta: {
          noCache: true,
          title: 'conversations',
          hidden: true
        }
      },
      {
        path: 'import-recipients',
        component: () => import('@/views/recipients/import-recipients.vue'),
        name: 'UploadRecipients',
        meta: {
          noCache: true,
          title: 'uploadRecipients',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/workflows',
    component: Layout,
    redirect: '/workflows/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/workflows/index.vue'),
        name: 'Workflows',
        meta: {
          title: 'workflows',
          icon: 'tree'
        }
      },
      {
        path: '/workflows/:id/show',
        component: () => import('@/views/workflows/show.vue'),
        name: 'WorkflowView',
        meta: {
          noCache: true,
          title: 'workflow',
          icon: 'tree',
          hidden: true
        }
      },
      {
        path: '/workflows/:id/edit',
        component: () => import('@/views/workflows/edit.vue'),
        name: 'WorkflowEdit',
        meta: {
          noCache: true,
          title: 'workflow',
          icon: 'tree',
          hidden: true
        }
      },
      {
        path: '/workflows/new',
        component: () => import('@/views/workflows/new.vue'),
        name: 'WorkflowCreate',
        meta: {
          noCache: true,
          title: 'workflow',
          icon: 'tree',
          hidden: true
        }
      },
      {
        path: 'import-workflows',
        component: () => import('@/views/workflows/import-workflows.vue'),
        name: 'UploadWorkflows',
        meta: {
          noCache: true,
          title: 'uploadWorkflows',
          icon: 'tree',
          hidden: true
        }
      },
      {
        path: '/workflows/:workflowId/recipients/:id/chat',
        component: () => import('@/views/workflows/chat.vue'),
        name: 'WorkflowRecipientChat',
        meta: {
          noCache: true,
          title: 'conversations',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/menus',
    component: Layout,
    redirect: '/menus/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/menus/index.vue'),
        name: 'Menus',
        meta: {
          title: 'menus',
          icon: 'menu'
        }
      },
      {
        path: '/menus/:id/show',
        component: () => import('@/views/menus/show.vue'),
        name: 'MenuView',
        meta: {
          noCache: true,
          title: 'menu',
          icon: 'menu',
          hidden: true
        }
      },
      {
        path: '/menus/:id/edit',
        component: () => import('@/views/menus/edit.vue'),
        name: 'MenuEdit',
        meta: {
          noCache: true,
          title: 'menu',
          icon: 'menu',
          hidden: true
        }
      },
      {
        path: '/menus/new',
        component: () => import('@/views/menus/new.vue'),
        name: 'MenuCreate',
        meta: {
          noCache: true,
          title: 'menu',
          icon: 'menu',
          hidden: true
        }
      },
      {
        path: 'import-menus',
        component: () => import('@/views/menus/import-menus.vue'),
        name: 'UploadMenus',
        meta: {
          noCache: true,
          title: 'menu',
          icon: 'menu',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/companies',
    redirect: '/companies/index',
    component: Layout,
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/companies/index.vue'),
        name: 'Companies',
        meta: {
          title: 'companies',
          icon: 'company'
        }
      },
      {
        path: 'import-companies',
        component: () => import('@/views/companies/import-companies.vue'),
        name: 'UploadCompanies',
        meta: {
          noCache: true,
          title: 'uploadCompanies',
          icon: 'company',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/users',
    component: () => import('@/views/users/index.vue'),
    redirect: '/users/index',
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/index.vue'),
        name: 'Users',
        meta: {
          title: 'users',
          icon: 'users'
        }
      }
    ]
  },
  {
    path: '/platform-numbers',
    component: () => import('@/views/platform-numbers/index.vue'),
    redirect: '/platform-numbers/index',
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/platform-numbers/index.vue'),
        name: 'Platform Numbers',
        meta: {
          title: 'platformNumbers',
          icon: 'platform-numbers'
        }
      }
    ]
  },
  {
    path: '/integrations',
    component: () => import('@/views/integrations/index.vue'),
    redirect: '/integrations/index',
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/integrations/index.vue'),
        name: 'Integrations',
        meta: {
          title: 'integrations',
          icon: 'integrations'
        }
      }
    ]
  },
  {
    path: '/settings',
    component: () => import('@/views/settings/index.vue'),
    redirect: '/settings/index',
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/settings/index.vue'),
        name: 'Settings',
        meta: {
          title: 'settings',
          icon: 'settings'
        }
      }
    ]
  },
  {
    path: '/tags',
    component: () => import('@/views/tags/index.vue'),
    redirect: '/tags/index',
    meta: {
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tags/index.vue'),
        name: 'Tags',
        meta: {
          title: 'tags',
          icon: 'tags'
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
