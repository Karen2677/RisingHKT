import { supabase } from '../lib/supabase';

// Cache IP address to avoid multiple API calls
let cachedIpAddress: string | null = null;
let cachedCountry: string | null = null;

// Function to get user's IP address
const getUserIpAddress = async (): Promise<string> => {
  if (cachedIpAddress) {
    return cachedIpAddress;
  }

  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();
    cachedIpAddress = ip;
    return ip;
  } catch (error) {
    console.warn('Failed to fetch IP address:', error);
    return '';
  }
};

// Function to get user's country from IP address
const getUserCountry = async (ip: string): Promise<string> => {
  if (cachedCountry) {
    return cachedCountry;
  }

  try {
    const countryRes = await fetch(`https://ipapi.co/${ip}/country_name/?lang=zh`);
    const country = await countryRes.text();
    cachedCountry = country.trim();
    return cachedCountry;
  } catch (error) {
    console.warn('Failed to fetch country:', error);
    return '';
  }
};

export const logClickEvent = async (eventKey: string) => {
  try {
    const ipAddress = await getUserIpAddress();
    const country = ipAddress ? await getUserCountry(ipAddress) : '';
    await supabase.from('site_event_logs').insert([{
      event_key: eventKey,
      ip_address: ipAddress,
      referer: document.referrer || null,
      country: country || null
    }]);
  } catch (error) {
    console.warn('Failed to log event:', error);
  }
};

// 页面访问事件记录
export const logPageView = async (pagePath: string) => {
  try {
    const ipAddress = await getUserIpAddress();
    const country = ipAddress ? await getUserCountry(ipAddress) : '';
    await supabase.from('site_event_logs').insert([{
      event_key: `page_view_${pagePath}`,
      ip_address: ipAddress,
      referer: document.referrer || null,
      country: country || null
    }]);
  } catch (error) {
    console.warn('Failed to log page view:', error);
  }
};

// 产品查看事件记录
export const logProductView = async (productIdentifier: string) => {
  try {
    const ipAddress = await getUserIpAddress();
    const country = ipAddress ? await getUserCountry(ipAddress) : '';
    await supabase.from('site_event_logs').insert([{
      event_key: `product_view_${productIdentifier}`,
      ip_address: ipAddress,
      referer: document.referrer || null,
      country: country || null
    }]);
  } catch (error) {
    console.warn('Failed to log product view:', error);
  }
};

// 新闻文章查看事件记录
export const logNewsView = async (articleId: string) => {
  try {
    const ipAddress = await getUserIpAddress();
    const country = ipAddress ? await getUserCountry(ipAddress) : '';
    await supabase.from('site_event_logs').insert([{
      event_key: `news_view_${articleId}`,
      ip_address: ipAddress,
      referer: document.referrer || null,
      country: country || null
    }]);
  } catch (error) {
    console.warn('Failed to log news view:', error);
  }
};

// 语言切换事件记录
export const logLanguageSwitch = async (fromLang: string, toLang: string) => {
  try {
    const ipAddress = await getUserIpAddress();
    const country = ipAddress ? await getUserCountry(ipAddress) : '';
    await supabase.from('site_event_logs').insert([{
      event_key: `language_switch_${fromLang}_to_${toLang}`,
      ip_address: ipAddress,
      referer: document.referrer || null,
      country: country || null
    }]);
  } catch (error) {
    console.warn('Failed to log language switch:', error);
  }
};