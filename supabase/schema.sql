-- Create Categories Table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Products Table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image_url TEXT,
    badge VARCHAR(50),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_best_seller BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read Access)
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);

-- Insert Demo Categories
INSERT INTO public.categories (name, slug) VALUES 
('Best Bathing Soaps', 'bathing-soaps'),
('Face Care', 'face-care'),
('Body Care', 'body-care'),
('Lip Care', 'lip-care');

-- Insert Demo Products
INSERT INTO public.products (name, slug, price, original_price, badge, is_best_seller) VALUES 
('Magic Face Wash with Sandalwood & Glutathione', 'magic-face-wash', 549, 650, 'Best Seller', true),
('Magic Cream with Saffron & Niacinamide', 'magic-cream', 999, 1200, NULL, true),
('Kojic Acid 2% Soap with Niacinamide', 'kojic-acid-soap', 399, 499, '10% OFF', true),
('Exfoliating Body Glove', 'exfoliating-body-glove', 699, 850, NULL, true);
