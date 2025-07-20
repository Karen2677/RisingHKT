import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, AboutSection, ContactInfo, MetaTag, ProductCategory } from '../types/database';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_categories(*)')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Products fetch error:', error);
          throw error;
        }
        
        console.log('Products data structure:', data);
        setProducts(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching products';
        console.error('Products error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { products, loading, error };
}

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Categories fetch error:', error);
          throw error;
        }
        
        console.log('Categories data structure:', data);
        setCategories(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching categories';
        console.error('Categories error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    const subscription = supabase
      .channel('categories_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_categories' }, fetchCategories)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { categories, loading, error };
}

export function useAboutSections() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data, error } = await supabase
          .from('about_sections')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('About sections fetch error:', error);
          throw error;
        }
        
        console.log('About sections data structure:', data);
        setSections(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching about sections';
        console.error('About sections error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();

    const subscription = supabase
      .channel('about_sections_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'about_sections' }, fetchSections)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { sections, loading, error };
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Contact info fetch error:', error);
          throw error;
        }
        
        console.log('Contact info data structure:', data);
        setContactInfo(data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching contact info';
        console.error('Contact info error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();

    const subscription = supabase
      .channel('contact_info_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_info' }, fetchContactInfo)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { contactInfo, loading, error };
}

export function useMetaTags(pageKey: string) {
  const [metaTags, setMetaTags] = useState<MetaTag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        const { data, error } = await supabase
          .from('meta_tags')
          .select('*')
          .eq('page_key', pageKey)
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Meta tags fetch error:', error);
          throw error;
        }
        
        console.log('Meta tags data structure:', data);
        setMetaTags(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred fetching meta tags';
        console.error('Meta tags error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMetaTags();

    const subscription = supabase
      .channel('meta_tags_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'meta_tags' }, fetchMetaTags)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [pageKey]);

  return { metaTags, loading, error };
}