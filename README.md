

# HandsOnHip Client

Bu proje, React ve MUI (Material-UI) kullanarak geliştirilmiş bir web uygulamasıdır.
## Gereksinimler

- Node.js (v18.17.0 veya üstü)
- npm (v10.8.2 veya üstü)

## Kurulum

### Node.js ve npm Kurulumu

Node.js ve npm'i kurmak için aşağıdaki adımları izleyin:

1. Node.js [resmi web sitesinden](https://nodejs.org/) indirin ve kurun.
2. Kurulum sonrası terminal veya komut istemcisinde aşağıdaki komutları çalıştırarak kurulumun başarılı olduğunu doğrulayın:
    ```bash
    node -v
    npm -v
    ```

### Proje Kurulumu

1. Projeyi klonlayın veya indirin.
2. Terminal veya komut istemcisinde proje dizinine gidin ve aşağıdaki komutu çalıştırarak gerekli paketleri kurun:
    ```bash
    npm install
    ```

### Ek Paketlerin Kurulumu

Proje için gerekli ek paketleri aşağıdaki komutlarla kurabilirsiniz:

1. React Router DOM, Axios ve MUI:
    ```bash
    npm install react-router-dom@6 axios @mui/material 
    ```

2. TypeScript ve gerekli tip tanımlamaları:
    ```bash
    npm install typescript @types/react @types/react-dom @types/react-router-dom
    ```

3. Ek olarak gerekli paketler:
    ```bash
    npm install @mui/icons-material --force
    ```

### Projeyi Çalıştırma

Projeyi geliştirme modunda çalıştırmak için aşağıdaki komutu kullanın:

```bash
npm start
```
Tarayıcınızda http://localhost:3000 adresini açarak uygulamayı görüntüleyebilirsiniz.

### API Entegrasyonu

Gerekli verileri almak için axios kullanılarak backend API ile entegrasyon sağlanmıştır. API çağrılarını src/api klasöründe bulabilirsiniz.

### Kullanılan Teknolojiler

- React
- MUI (Material-UI)
- TypeScript
- Axios
