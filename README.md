# AssistPro - Professional Services Website

## 📋 პროექტის აღწერა

AssistPro არის თანამედროვე ვებ-აპლიკაცია, რომელიც განკუთვნილია კორპორატიული სერვისების მომწოდებელი კომპანიისთვის. საიტი უზრუნველყოფს სრულ ინფორმაციას კომპანიის მიერ შეთავაზებულ სერვისებზე, გუნდის წევრებზე და საკონტაქტო ინფორმაციაზე.

## 🚀 მთავარი ფუნქციები

- **React 18** + **TypeScript** - თანამედროვე frontend
- **Express.js** - მძლავრი backend სერვერი
- **PostgreSQL** + **Drizzle ORM** - მონაცემთა ბაზის მართვა
- **Tailwind CSS** - თანამედროვე დიზაინი
- **Framer Motion** - ანიმაციები
- **i18next** - მრავალენოვანი მხარდაჭერა
- **Wouter** - კლიენტის როუტინგი
- **Vite** - სწრაფი განვითარება

## 📚 სერვისების მიმოხილვა

### 🏢 ბიზნეს სერვისები
- **საბუღალტრო მომსახურება** - სრული ფინანსური მართვა
- **საგადასახადო კონსულტაცია** - საგადასახადო ტვირთის ოპტიმიზაცია
- **იურიდიული მომსახურება** - კანონიერი დახმარება
- **ბიზნეს-ასისტენტი** - ოპერაციული მხარდაჭერა
- **აუდიტი** - ფინანსური ანალიზი
- **HR სერვისები** - ადამიანური რესურსების მართვა

### 🔧 ტექნიკური მახასიათებლები
- **რესპონსიული დიზაინი** - ყველა მოწყობილობისთვის
- **SEO ოპტიმიზაცია** - ძიების სისტემებისთვის
- **ანიმაციები** - მომხმარებლის გამოცდილება
- **ბმული ფორმები** - კომუნიკაციისთვის
- **ადმინისტრირება** - შინაარსის მართვა

## 📦 ინსტალაცია

### 🔧 პირველადი კონფიგურაცია

```bash
# რეპოზიტორიის კლონირება
git clone https://github.com/[your-username]/assist3.git
cd assist3

# დეპენდენციების ინსტალაცია
npm install

# გარემოს ცვლადები
cp .env.example .env
```

### 🗃️ მონაცემთა ბაზის კონფიგურაცია

```bash
# PostgreSQL კონფიგურაცია
DATABASE_URL="postgresql://username:password@localhost:5432/assist"

# მონაცემთა ბაზის მიგრაცია
npm run db:push
```

### 🚀 განვითარების რეჟიმი

```bash
# სერვერის გაშვება
npm run dev

# ხელმისაწვდომია:
# http://localhost:5000 - მთავარი საიტი
# http://localhost:5000/admin - ადმინისტრაციის პანელი
```

## 🏗️ პროდაქციული ბილდი

```bash
# ბილდის შექმნა
npm run build

# პროდაქციული სერვერი
npm start
```

## 🌐 CloudPanel-ზე დეპლოიმენტი

### 📋 წინაპირობები
- CloudPanel-ის მოქმედი ინსტალაცია
- Node.js 18+ მხარდაჭერა
- PostgreSQL მონაცემთა ბაზა
- SSL სერტიფიკატი (რეკომენდებული)

### 🔧 ნაბიჯ-ნაბიჯ ინსტრუქცია

#### 1. **CloudPanel-ში საიტის შექმნა**
```bash
# CloudPanel Dashboard-ზე გადით
# Sites > Add Site > Node.js
# Site Name: assistpro.com
# Node.js Version: 18+
```

#### 2. **კოდის განთავსება**
```bash
# SSH-ით დაკავშირდით სერვერთან
ssh root@your-server-ip

# საიტის დირექტორიაში გადიდით
cd /home/[site-user]/htdocs/[site-name]

# Git რეპოზიტორიის კლონირება
git clone https://github.com/[your-username]/assist3.git .

# ფაილების უფლებების დაყენება
chown -R [site-user]:[site-user] .
```

#### 3. **გარემოს ცვლადები**
```bash
# .env ფაილის შექმნა
nano .env

# ღირებულებების დაყენება:
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://db_user:db_password@localhost:5432/assist_db"
ADMIN_TOKEN="your-secure-admin-token"
CORS_ORIGIN="https://yourdomain.com"
```

#### 4. **მონაცემთა ბაზის კონფიგურაცია**
```bash
# PostgreSQL შექმნა CloudPanel-ში
# Databases > Add Database
# Database Name: assist_db
# Username: db_user
# Password: [secure-password]

# მიგრაციის გაშვება
npm run db:push
```

#### 5. **აპლიკაციის ბილდი**
```bash
# დეპენდენციების ინსტალაცია
npm ci --production

# ბილდის შექმნა
npm run build
```

#### 6. **PM2 კონფიგურაცია**
```bash
# PM2 ინსტალაცია (თუ არ არის)
npm install -g pm2

# PM2 კონფიგურაცია
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'assistpro',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

#### 7. **სერვისის დაწყება**
```bash
# PM2-ით სერვისის გაშვება
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 8. **Reverse Proxy კონფიგურაცია**
```bash
# CloudPanel-ში Vhost კონფიგურაცია
# Sites > [your-site] > Vhost > Edit
```

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

#### 9. **SSL სერტიფიკატი**
```bash
# CloudPanel-ში SSL-ის ჩართვა
# Sites > [your-site] > SSL > Let's Encrypt
```

### 🔍 ვერიფიკაცია

```bash
# სერვისის სტატუსი
pm2 status

# ლოგების ნახვა
pm2 logs assistpro

# კავშირის შემოწმება
curl -I https://yourdomain.com
```

## 🔐 უსაფრთხოება

### 🛡️ რეკომენდებული პარამეტრები

```bash
# გარემოს ცვლადები
ADMIN_TOKEN="strong-random-token-here"
DATABASE_URL="postgresql://secure_user:complex_password@localhost:5432/assist_db"

# ფაილების უფლებები
chmod 600 .env
chmod -R 755 dist/
```

### 🔒 ბრანდმაუერი
```bash
# CloudPanel-ში ფაირვოლის კონფიგურაცია
# Security > Firewall
# Allow: 80, 443, 22
# Block: 3000 (internal port)
```

## 📊 მონიტორინგი

### 📈 PM2 მონიტორინგი
```bash
# რეალ-ტაიმ მონიტორინგი
pm2 monit

# მეტრიკები
pm2 show assistpro
```

### 🔍 ლოგები
```bash
# ლოგების ნახვა
pm2 logs assistpro --lines 100

# ლოგების როტაცია
pm2 install pm2-logrotate
```

## 🚀 განახლების პროცედურა

```bash
# კოდის განახლება
git pull origin main

# დეპენდენციების განახლება
npm ci --production

# ბილდის შექმნა
npm run build

# სერვისის გადატვირთვა
pm2 restart assistpro
```

## 🆘 ტრაბლშუტინგი

### ❌ ხშირი პრობლემები

1. **პორტის კონფლიქტი**
```bash
# პორტის შემოწმება
netstat -tlnp | grep :3000
```

2. **მონაცემთა ბაზის კავშირი**
```bash
# კავშირის შემოწმება
psql -h localhost -U db_user -d assist_db -c "SELECT 1;"
```

3. **ფაილების უფლებები**
```bash
# უფლებების გასწორება
chown -R [site-user]:[site-user] /home/[site-user]/htdocs/[site-name]
```

## 🤝 წვლილი

თუ გსურთ პროექტში წვლილის შეტანა:

1. Fork the repository
2. Create a feature branch
3. Commit your changes  
4. Push to the branch
5. Create a Pull Request

## 📝 ლიცენზია

MIT License - იხილეთ LICENSE ფაილი დეტალებისთვის.

## 📞 საკონტაქტო ინფორმაცია

- **Email**: info@assistpro.com
- **Website**: https://assistpro.com
- **GitHub**: https://github.com/[your-username]/assist3

---

## 🎯 სტატუსი

- ✅ Development Environment
- ✅ Production Ready
- ✅ CloudPanel Compatible
- ✅ SSL Support
- ✅ Monitoring Ready

---

**განვითარებულია ❤️-ით React + TypeScript-ზე**
