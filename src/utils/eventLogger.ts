import { supabase } from '../lib/supabase';

export const logClickEvent = async (eventKey: string) => {
  try {
    await supabase.from('site_event_logs').insert([{
      event_key: eventKey,
      ip_address: '', // 可选，从后端中间层采集更准确
      referer: document.referrer || null
    }]);
  } catch (error) {
    console.warn('Failed to log event:', error);
  }
};

// 页面访问事件记录
export const logPageView = async (pagePath: string) => {
  try {
    await supabase.from('site_event_logs').insert([{
      event_key: `page_view_${pagePath}`,
      ip_address: '',
      referer: document.referrer || null
    }]);
  } catch (error) {
    console.warn('Failed to log page view:', error);
  }
};

// 产品查看事件记录
export const logProductView = async (productIdentifier: string) => {
  try {
    await supabase.from('site_event_logs').insert([{
      event_key: `product_view_${productIdentifier}`,
      ip_address: '',
      referer: document.referrer || null
    }]);
  } catch (error) {
    console.warn('Failed to log product view:', error);
  }
};

// 新闻文章查看事件记录
export const logNewsView = async (articleId: string) => {
  try {
    await supabase.from('site_event_logs').insert([{
      event_key: `news_view_${articleId}`,
      ip_address: '',
      referer: document.referrer || null
    }]);
  } catch (error) {
    console.warn('Failed to log news view:', error);
  }
};

// 语言切换事件记录
export const logLanguageSwitch = async (fromLang: string, toLang: string) => {
  try {
    await supabase.from('site_event_logs').insert([{
      event_key: `language_switch_${fromLang}_to_${toLang}`,
      ip_address: '',
      referer: document.referrer || null
    }]);
  } catch (error) {
    console.warn('Failed to log language switch:', error);
  }
};