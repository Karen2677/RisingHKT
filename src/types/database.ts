export interface Product {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  details_zh: string;
  details_en: string;
  image_url: string;
  features_zh: string[];
  features_en: string[];
  applications_zh: string[];
  applications_en: string[];
  disclaimer_en?: string;
  disclaimer_zh?: string;
  display_order: number;
  category_id?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  product_categories?: ProductCategory;
}

export interface ProductCategory {
  id: number;
  name_zh: string;
  name_en: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AboutSection {
  id: string;
  section_key: string;
  title_zh: string;
  title_en: string;
  content_zh?: string[];
  content_en?: string[];
  display_order: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInfo {
  id: string;
  type: string;
  value: string;
  label_zh: string;
  label_en: string;
  is_active?: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface MetaTag {
  id: string;
  page_key: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  keywords_zh?: string[];
  keywords_en?: string[];
  og_title_zh?: string;
  og_title_en?: string;
  og_description_zh?: string;
  og_description_en?: string;
  og_image?: string;
  canonical_url?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Admin {
  id: string;
  email: string;
  role: string;
  name: string;
  is_active?: boolean;
  last_login?: string;
  login_count?: number;
  notes?: string;
  reset_token?: string;
  reset_token_expires_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsArticle {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  slug: string;
  meta_description_zh?: string;
  meta_description_en?: string;
  source?: string;
  external_link?: string;
  category?: string;
  tags?: string[];
  cover_image?: string;
  attachments?: any;
  is_active?: boolean;
  is_featured?: boolean;
  display_order?: number;
  publish_date?: string;
  view_count?: number;
  share_count?: number;
  created_at?: string;
  updated_at?: string;
}