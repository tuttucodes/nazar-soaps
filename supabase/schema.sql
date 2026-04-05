-- ============================================================
-- Nazar Soaps — Full Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Drop existing tables if re-running
DROP TABLE IF EXISTS admin_activity_log CASCADE;
DROP TABLE IF EXISTS inventory_logs CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS product_concerns CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS concerns CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS marketing_campaigns CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS page_content CASCADE;

-- ============================================================
-- 1. CATEGORIES
-- ============================================================
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. CONCERNS
-- ============================================================
CREATE TABLE public.concerns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    color VARCHAR(20),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. PRODUCTS
-- ============================================================
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image_url TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    badge VARCHAR(100),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_best_seller BOOLEAN DEFAULT false,
    is_new_launch BOOLEAN DEFAULT false,
    is_combo BOOLEAN DEFAULT false,
    stock_quantity INT DEFAULT 100,
    low_stock_threshold INT DEFAULT 10,
    rating DECIMAL(2, 1),
    review_count INT DEFAULT 0,
    sold_count VARCHAR(50),
    variant_label VARCHAR(255),
    seo_title VARCHAR(255),
    seo_description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. PRODUCT <-> CONCERNS (many-to-many)
-- ============================================================
CREATE TABLE public.product_concerns (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    concern_id UUID REFERENCES public.concerns(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, concern_id)
);

-- ============================================================
-- 5. CUSTOMERS
-- ============================================================
CREATE TABLE public.customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. ORDERS
-- ============================================================
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number SERIAL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned')),
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping_fee DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping_address JSONB,
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. ORDER ITEMS
-- ============================================================
CREATE TABLE public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

-- ============================================================
-- 8. INVENTORY LOGS
-- ============================================================
CREATE TABLE public.inventory_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    change_qty INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. MARKETING CAMPAIGNS
-- ============================================================
CREATE TABLE public.marketing_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) DEFAULT 'social' CHECK (type IN ('email', 'social', 'ad', 'influencer')),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
    budget DECIMAL(12, 2) DEFAULT 0,
    spent DECIMAL(12, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    description TEXT,
    results JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. SITE SETTINGS
-- ============================================================
CREATE TABLE public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. PAGE CONTENT
-- ============================================================
CREATE TABLE public.page_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT DEFAULT '',
    seo_title VARCHAR(255),
    seo_description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. ADMIN ACTIVITY LOG
-- ============================================================
CREATE TABLE public.admin_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_email VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_inventory_logs_product ON inventory_logs(product_id);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for storefront
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
CREATE POLICY "public_read_concerns" ON concerns FOR SELECT USING (true);
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);
CREATE POLICY "public_read_product_concerns" ON product_concerns FOR SELECT USING (true);
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "public_read_page_content" ON page_content FOR SELECT USING (true);

-- Authenticated full access (for service_role key used in API routes)
CREATE POLICY "admin_all_categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_concerns" ON concerns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_product_concerns" ON product_concerns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_customers" ON customers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_inventory_logs" ON inventory_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_marketing" ON marketing_campaigns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_page_content" ON page_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_activity_log" ON admin_activity_log FOR ALL USING (auth.role() = 'authenticated');

-- Public can create orders (checkout)
CREATE POLICY "public_insert_customers" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_order_items" ON order_items FOR INSERT WITH CHECK (true);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED DATA
-- ============================================================

-- Categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Soaps', 'soaps', 'Premium ayurvedic bathing soaps', 1),
('Face Care', 'face', 'Face washes, creams, serums and more', 2),
('Body Care', 'body', 'Body lotions, scrubs, oils and more', 3),
('Best Sellers', 'best-sellers', 'Our most popular products', 4),
('New Launches', 'new-launches', 'Latest additions to our collection', 5);

-- Concerns
INSERT INTO concerns (name, slug, color, sort_order) VALUES
('Tanning', 'tanning', '#e8a87c', 1),
('Dark Spots', 'dark-spots', '#c9956b', 2),
('Acne', 'acne', '#d4a08c', 3),
('Exfoliation', 'exfoliation', '#dbb89a', 4);

-- Products
INSERT INTO products (name, slug, short_description, description, price, original_price, badge, is_best_seller, rating, review_count, sold_count, variant_label, stock_quantity, category_id) VALUES
(
  'Magic Soap (Sandal Wood & Glutathione)', 'magic-soap',
  'Watch those tan lines vanish with me every day! I''m your De-tan Magician.',
  'A powerful combination of Sandalwood and Glutathione that works as a de-tan magician. This soap gently removes tan, brightens skin tone, and leaves your skin feeling soft and radiant. Suitable for all skin types. Use daily for best results.',
  192, 210, 'Best Seller', true, 4.7, 4351, '10L+ Sold Out!!', 'Pack of 1 (9% off)', 500,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Rockstar Advanced Hair Growth Serum', 'rockstar-serum',
  'I''m the Comeback Track of your hair growth.',
  'India''s 1st Blue Pea powered hair growth serum. Powered with 4% Anagain, 3% Redensyl, 2% Baicapil & Blue Pea, it helps reactivate hair growth, improve density, and reduce hair fall — with a unique Precision Pump that targets the roots directly.',
  499, 777, 'Hurry! Limited Stock Only', false, null, 0, null, null, 200,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Magic Peeling Gel', 'magic-peeling-gel',
  'I''m the Natural replacement for those AHA, BHA & PHA chemical peeling.',
  'A gentle yet effective peeling gel that exfoliates dead skin cells without harsh chemicals. Made with natural ingredients, it reveals fresh, smooth skin underneath. Perfect for sensitive skin types who want exfoliation without irritation.',
  299, 499, '987 Left Only!!', true, null, 0, null, 'Magic Peeling Gel (40% off)', 987,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Clean-Up Kit', 'clean-up-kit',
  'A thoughtfully curated kit for a complete clean-up routine at home.',
  'Nazar Soaps, in collaboration with Koparo, brings you a thoughtfully curated kit. Includes face wash, peeling gel, face mask, and moisturizer — everything you need for a salon-quality clean-up at home.',
  599, 799, '300+ Sold out', false, null, 0, null, null, 150,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Magic Face Wash with Sandalwood & Glutathione', 'magic-face-wash',
  'Deep cleansing face wash for a radiant, de-tanned look.',
  'A magical face wash that deeply cleanses and gives you a radiant glow, blending the ancient wisdom of sandalwood with the modern brightness of glutathione. Perfect for daily use.',
  549, 650, 'Best Seller', true, null, 0, null, null, 300,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Magic Cream with Saffron & Niacinamide', 'magic-cream',
  'Luxurious face cream for brightening and hydration.',
  'A rich yet lightweight cream infused with Saffron extract and Niacinamide. Brightens skin, reduces dark spots, and provides deep hydration for a healthy, natural glow.',
  999, 1200, null, true, null, 0, null, null, 250,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Kojic Acid 2% Soap with Niacinamide', 'kojic-acid-soap',
  'Brightening soap that targets dark spots and uneven tone.',
  'Formulated with 2% Kojic Acid and Niacinamide, this soap actively works on dark spots, pigmentation, and uneven skin tone. Regular use reveals brighter, more even-toned skin.',
  399, 499, null, false, null, 0, null, null, 400,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Activated Charcoal Detox Soap', 'charcoal-soap',
  'Deep cleansing charcoal soap that draws out impurities.',
  'Activated charcoal acts like a magnet, drawing out dirt, oil, and toxins from deep within your pores. This detox soap leaves skin thoroughly clean without drying it out.',
  249, 349, 'Popular', false, null, 0, null, null, 350,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Turmeric & Saffron Glow Soap', 'turmeric-soap',
  'Traditional turmeric blend for a natural golden glow.',
  'Combining the centuries-old beauty secrets of Turmeric and Saffron, this soap imparts a natural golden glow to your skin while providing antibacterial protection.',
  229, 299, null, false, null, 0, null, null, 300,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Neem & Tea Tree Anti-Acne Soap', 'neem-soap',
  'Antibacterial soap that fights acne and blemishes.',
  'Powered by the antibacterial properties of Neem and Tea Tree Oil, this soap fights acne-causing bacteria, reduces inflammation, and helps prevent future breakouts.',
  219, 279, null, false, null, 0, null, null, 320,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Rose & Glycerin Moisturizing Soap', 'rose-soap',
  'Gentle moisturizing soap with rose extracts for soft skin.',
  'A luxuriously gentle soap enriched with Rose extracts and Glycerin. Deeply moisturizes while cleansing, leaving skin soft, supple, and delicately fragrant.',
  199, 249, null, false, null, 0, null, null, 280,
  (SELECT id FROM categories WHERE slug = 'soaps')
),
(
  'Cocoa Butter Body Lotion', 'body-lotion',
  'Rich moisturizing lotion with cocoa butter for silky smooth skin.',
  'A deeply nourishing body lotion enriched with Cocoa Butter and Vitamin E. Locks in moisture for 24 hours, leaving skin silky smooth and beautifully hydrated.',
  449, 599, 'Best Seller', true, null, 0, null, null, 200,
  (SELECT id FROM categories WHERE slug = 'body')
),
(
  'Coffee & Walnut Body Scrub', 'body-scrub',
  'Exfoliating scrub that removes dead skin and boosts circulation.',
  'A invigorating body scrub with ground Coffee and Walnut shell particles. Effectively removes dead skin cells, boosts blood circulation, and leaves skin smooth and revitalized.',
  399, 549, null, false, null, 0, null, null, 180,
  (SELECT id FROM categories WHERE slug = 'body')
),
(
  'Vitamin C Brightening Serum', 'vitamin-c-serum',
  'Potent vitamin C serum for dark spots and dull skin.',
  'A powerful serum with stabilized Vitamin C (15%) that targets dark spots, dullness, and uneven skin tone. Antioxidant protection shields skin from environmental damage.',
  599, 799, null, false, null, 0, null, null, 220,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Sunscreen SPF 50+ PA++++', 'sunscreen-spf50',
  'Lightweight, non-greasy sunscreen with broad spectrum protection.',
  'A lightweight, non-greasy sunscreen with SPF 50+ and PA++++ rating. Provides broad spectrum protection against UVA and UVB rays without leaving a white cast.',
  449, 599, null, false, null, 0, null, null, 350,
  (SELECT id FROM categories WHERE slug = 'face')
),
(
  'Exfoliating Body Glove', 'exfoliating-glove',
  'Premium exfoliating glove for smooth, polished skin.',
  'A premium quality exfoliating body glove that removes dead skin cells effortlessly. Use with your favorite body wash for an invigorating, spa-like experience.',
  699, 850, null, false, null, 0, null, null, 150,
  (SELECT id FROM categories WHERE slug = 'body')
);

-- Mark new launches
UPDATE products SET is_new_launch = true WHERE slug IN ('rockstar-serum');

-- Mark combos
UPDATE products SET is_combo = true WHERE slug IN ('clean-up-kit');

-- Product-Concern relationships
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'magic-soap' AND c.slug = 'tanning';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'magic-face-wash' AND c.slug = 'tanning';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'kojic-acid-soap' AND c.slug = 'dark-spots';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'vitamin-c-serum' AND c.slug = 'dark-spots';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'magic-cream' AND c.slug = 'dark-spots';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'neem-soap' AND c.slug = 'acne';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'charcoal-soap' AND c.slug = 'acne';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'magic-peeling-gel' AND c.slug = 'exfoliation';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'body-scrub' AND c.slug = 'exfoliation';
INSERT INTO product_concerns (product_id, concern_id)
SELECT p.id, c.id FROM products p, concerns c WHERE p.slug = 'exfoliating-glove' AND c.slug = 'exfoliation';

-- Site Settings
INSERT INTO site_settings (key, value) VALUES
('announcement_bar', 'ENJOY FREE SHIPPING ON PREPAID ORDERS + EXCITING FREEBIES'),
('marquee_text_1', 'Bringing The Comfort of Home to Your Daily Routine.'),
('marquee_text_2', 'Discover the gentle touch of nature in every bar'),
('store_name', 'Nazar Soaps'),
('store_tagline', 'AYURVEDA+SCIENCE'),
('store_email', 'support@nazarsoaps.com'),
('store_phone', '+91 98765 43210'),
('store_address', 'Nazar Soaps Pvt. Ltd., 123 Ayurveda Lane, Mumbai, Maharashtra 400001, India'),
('seo_default_title', 'Nazar Soaps | Natural Ayurvedic Skincare - Soaps, Face Care, Body Care'),
('seo_default_description', 'Shop natural, chemical-free skincare products at Nazar Soaps. Ayurveda + Science for de-tanning, brightening, acne control & more. Free shipping on prepaid orders.'),
('meta_keywords', 'nazar soaps, ayurvedic soap, natural skincare, de-tan soap, face wash, body care, organic soap India');

-- Page Content
INSERT INTO page_content (page_slug, title, content, seo_title, seo_description) VALUES
('about', 'About Nazar Soaps', 'Nazar Soaps was born out of a simple belief — that skincare should be effective, affordable, and rooted in nature.', 'About Us | Nazar Soaps - Ayurveda + Science', 'Learn about Nazar Soaps — our mission to bring natural, affordable skincare combining Ayurveda and Science.'),
('faq', 'Frequently Asked Questions', '', 'FAQ | Nazar Soaps', 'Find answers to common questions about Nazar Soaps products, shipping, returns, and more.'),
('privacy', 'Privacy Policy', '', 'Privacy Policy | Nazar Soaps', 'Read the Nazar Soaps privacy policy to understand how we collect, use, and protect your personal information.'),
('terms', 'Terms & Conditions', '', 'Terms & Conditions | Nazar Soaps', 'Read the terms and conditions for using the Nazar Soaps website and purchasing our products.'),
('returns', 'Returns & Refunds', '', 'Returns & Refunds Policy | Nazar Soaps', 'Learn about our 7-day return policy, refund process, and how to initiate a return for Nazar Soaps products.'),
('contact', 'Contact Us', '', 'Contact Us | Nazar Soaps', 'Get in touch with Nazar Soaps — email, phone, address, and contact form.');

-- Sample customers
INSERT INTO customers (email, name, phone, city, state, pincode, total_orders, total_spent) VALUES
('priya.sharma@email.com', 'Priya Sharma', '+91 99887 76655', 'Mumbai', 'Maharashtra', '400001', 5, 3500),
('rahul.verma@email.com', 'Rahul Verma', '+91 88776 65544', 'Delhi', 'Delhi', '110001', 3, 1800),
('anita.patel@email.com', 'Anita Patel', '+91 77665 54433', 'Ahmedabad', 'Gujarat', '380001', 2, 1200);

-- Sample orders
INSERT INTO orders (customer_id, status, payment_method, payment_status, subtotal, shipping_fee, total, shipping_address, created_at) VALUES
(
  (SELECT id FROM customers WHERE email = 'priya.sharma@email.com'),
  'delivered', 'UPI', 'paid', 741, 0, 741,
  '{"name": "Priya Sharma", "address": "123 Marine Drive", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb,
  NOW() - INTERVAL '5 days'
),
(
  (SELECT id FROM customers WHERE email = 'rahul.verma@email.com'),
  'shipped', 'Credit Card', 'paid', 999, 0, 999,
  '{"name": "Rahul Verma", "address": "456 Connaught Place", "city": "Delhi", "state": "Delhi", "pincode": "110001"}'::jsonb,
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM customers WHERE email = 'anita.patel@email.com'),
  'pending', 'COD', 'pending', 449, 40, 489,
  '{"name": "Anita Patel", "address": "789 CG Road", "city": "Ahmedabad", "state": "Gujarat", "pincode": "380001"}'::jsonb,
  NOW() - INTERVAL '1 day'
);

-- Sample order items
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES
(
  (SELECT id FROM orders WHERE total = 741),
  (SELECT id FROM products WHERE slug = 'magic-soap'),
  'Magic Soap (Sandal Wood & Glutathione)', 3, 192, 576
),
(
  (SELECT id FROM orders WHERE total = 741),
  (SELECT id FROM products WHERE slug = 'neem-soap'),
  'Neem & Tea Tree Anti-Acne Soap', 1, 165, 165
),
(
  (SELECT id FROM orders WHERE total = 999),
  (SELECT id FROM products WHERE slug = 'magic-cream'),
  'Magic Cream with Saffron & Niacinamide', 1, 999, 999
),
(
  (SELECT id FROM orders WHERE total = 489),
  (SELECT id FROM products WHERE slug = 'body-lotion'),
  'Cocoa Butter Body Lotion', 1, 449, 449
);

-- Sample marketing campaign
INSERT INTO marketing_campaigns (name, type, status, budget, spent, start_date, end_date, description) VALUES
('Summer De-Tan Campaign', 'social', 'active', 50000, 12000, '2026-04-01', '2026-05-31', 'Instagram and Facebook campaign promoting Magic Soap and De-Tan products for summer.'),
('Rockstar Launch Campaign', 'influencer', 'active', 100000, 35000, '2026-03-15', '2026-04-30', 'Influencer partnerships for the Rockstar Hair Growth Serum launch.');
