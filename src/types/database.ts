/**
 * Hand-written mirror of omnivo_schema.sql.
 *
 * Once the schema is applied to a live Supabase project, replace this file
 * by running the real generator so it stays byte-for-byte in sync:
 *   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
 */

export type PlatformRole = 'user' | 'admin' | 'support'
export type BusinessCategory =
  | 'restaurant'
  | 'cafe'
  | 'bakery'
  | 'food_truck'
  | 'salon'
  | 'spa'
  | 'barbershop'
  | 'retail'
  | 'hotel'
  | 'other'
export type BusinessStatus = 'draft' | 'published' | 'suspended'
export type TeamRole = 'owner' | 'manager' | 'staff'
export type TeamMemberStatus = 'invited' | 'active' | 'removed'
export type ItemType = 'product' | 'service'
export type QrType = 'business' | 'table' | 'poster' | 'sticker'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
export type BillingProvider = 'stripe' | 'paddle'
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete'
export type AnalyticsEventType =
  | 'view'
  | 'item_view'
  | 'qr_scan'
  | 'click_call'
  | 'click_whatsapp'
  | 'click_map'
  | 'click_website'
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'
export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'youtube' | 'linkedin'
export type DiscountType = 'percent' | 'fixed'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          platform_role: PlatformRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          platform_role?: PlatformRole
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      plans: {
        Row: {
          id: string
          slug: string
          name: string
          price_monthly: number
          price_yearly: number
          max_businesses: number | null
          max_products_per_business: number | null
          max_staff_per_business: number | null
          custom_branding: boolean
          premium_themes: boolean
          analytics_enabled: boolean
          priority_support: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['plans']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['plans']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          owner_id: string
          plan_id: string
          status: SubscriptionStatus
          billing_provider: BillingProvider | null
          provider_customer_id: string | null
          provider_subscription_id: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          plan_id: string
          status?: SubscriptionStatus
          billing_provider?: BillingProvider | null
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
        }
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
      themes: {
        Row: {
          id: string
          slug: string
          name: string
          preview_image_url: string | null
          color_tokens: Record<string, unknown>
          font_tokens: Record<string, unknown>
          is_premium: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['themes']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['themes']['Insert']>
      }
      businesses: {
        Row: {
          id: string
          owner_id: string
          theme_id: string | null
          name: string
          slug: string
          category: BusinessCategory
          status: BusinessStatus
          description: string | null
          logo_url: string | null
          cover_image_url: string | null
          phone: string | null
          email: string | null
          whatsapp_number: string | null
          website_url: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          currency: string
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          theme_id?: string | null
          name: string
          slug: string
          category: BusinessCategory
          status?: BusinessStatus
          description?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          phone?: string | null
          email?: string | null
          whatsapp_number?: string | null
          website_url?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          currency?: string
          timezone?: string
        }
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>
      }
      business_hours: {
        Row: {
          id: string
          business_id: string
          day_of_week: number
          open_time: string | null
          close_time: string | null
          is_closed: boolean
        }
        Insert: Omit<Database['public']['Tables']['business_hours']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['business_hours']['Insert']>
      }
      business_social_links: {
        Row: {
          id: string
          business_id: string
          platform: SocialPlatform
          url: string
        }
        Insert: Omit<Database['public']['Tables']['business_social_links']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['business_social_links']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          business_id: string
          user_id: string | null
          invited_email: string | null
          role: TeamRole
          status: TeamMemberStatus
          invited_at: string
          joined_at: string | null
        }
        Insert: {
          id?: string
          business_id: string
          user_id?: string | null
          invited_email?: string | null
          role?: TeamRole
          status?: TeamMemberStatus
          joined_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      item_categories: {
        Row: {
          id: string
          business_id: string
          name: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['item_categories']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['item_categories']['Insert']>
      }
      catalog_items: {
        Row: {
          id: string
          business_id: string
          category_id: string | null
          item_type: ItemType
          name: string
          description: string | null
          price: number
          discount_price: number | null
          is_available: boolean
          is_hidden: boolean
          is_featured: boolean
          is_popular: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          category_id?: string | null
          item_type?: ItemType
          name: string
          description?: string | null
          price: number
          discount_price?: number | null
          is_available?: boolean
          is_hidden?: boolean
          is_featured?: boolean
          is_popular?: boolean
          sort_order?: number
        }
        Update: Partial<Database['public']['Tables']['catalog_items']['Insert']>
      }
      item_images: {
        Row: { id: string; item_id: string; image_url: string; sort_order: number; is_primary: boolean }
        Insert: Omit<Database['public']['Tables']['item_images']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['item_images']['Insert']>
      }
      item_variants: {
        Row: {
          id: string
          item_id: string
          name: string
          value: string
          price_modifier: number
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['item_variants']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['item_variants']['Insert']>
      }
      item_addons: {
        Row: {
          id: string
          item_id: string
          name: string
          price: number
          is_required: boolean
          max_selectable: number
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['item_addons']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['item_addons']['Insert']>
      }
      media_library: {
        Row: {
          id: string
          business_id: string
          uploaded_by: string | null
          file_url: string
          file_type: string
          file_name: string
          file_size_bytes: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['media_library']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['media_library']['Insert']>
      }
      qr_codes: {
        Row: {
          id: string
          business_id: string
          type: QrType
          label: string | null
          target_url: string
          design_config: Record<string, unknown>
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['qr_codes']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['qr_codes']['Insert']>
      }
      orders: {
        Row: {
          id: string
          business_id: string
          order_number: string
          customer_name: string | null
          customer_phone: string | null
          table_number: string | null
          status: OrderStatus
          subtotal: number
          total: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          order_number: string
          customer_name?: string | null
          customer_phone?: string | null
          table_number?: string | null
          status?: OrderStatus
          subtotal?: number
          total?: number
          notes?: string | null
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          catalog_item_id: string | null
          item_name_snapshot: string
          unit_price: number
          quantity: number
          selected_variants: unknown[]
          selected_addons: unknown[]
          line_total: number
        }
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id'> & { id?: string }
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
      }
      coupons: {
        Row: {
          id: string
          code: string
          discount_type: DiscountType
          discount_value: number
          applicable_plan_id: string | null
          max_uses: number | null
          used_count: number
          valid_from: string
          valid_until: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['coupons']['Row'], 'id' | 'created_at' | 'used_count'> & {
          id?: string
          used_count?: number
        }
        Update: Partial<Database['public']['Tables']['coupons']['Insert']>
      }
      analytics_events: {
        Row: {
          id: string
          business_id: string
          item_id: string | null
          event_type: AnalyticsEventType
          visitor_id: string | null
          country: string | null
          device_type: string | null
          referrer: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['analytics_events']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['analytics_events']['Insert']>
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          business_id: string | null
          subject: string
          status: TicketStatus
          priority: TicketPriority
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_id?: string | null
          subject: string
          status?: TicketStatus
          priority?: TicketPriority
        }
        Update: Partial<Database['public']['Tables']['support_tickets']['Insert']>
      }
      support_ticket_messages: {
        Row: { id: string; ticket_id: string; sender_id: string; message: string; created_at: string }
        Insert: Omit<Database['public']['Tables']['support_ticket_messages']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['support_ticket_messages']['Insert']>
      }
      feature_flags: {
        Row: {
          id: string
          key: string
          description: string | null
          is_enabled_globally: boolean
          enabled_plan_ids: string[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['feature_flags']['Row'], 'id' | 'created_at'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['feature_flags']['Insert']>
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
