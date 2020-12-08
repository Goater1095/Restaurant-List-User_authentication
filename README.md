# Restaurant-List Authentication (個人餐廳清單)

一個使用 Express + node.js 建立的個人化餐廳清單

![Login Page](/public/images/login.png)
![Register Page](/public/images/register.png)
![Home Page](/public/images/index.png)
![Detail Page](/public/images/show.png)

### 功能描述 (features)：

- 使用者可以在首頁看到所有餐廳與它們的簡單資料：
  餐廳照片 / 餐廳名稱 / 餐廳分類 / 餐廳評分
- 使用者可以再點進去看餐廳的詳細資訊：
  類別 / 地址 / 電話 / 描述 / 圖片
- 使用者可以透過"搜尋餐廳名稱"來找到特定的餐廳
- 使用者可以透過"新增餐廳清單"來建立特定的餐廳
- 使用者可以透過"Edit button" & "修改餐廳內容" 變更餐廳的詳細資訊
- 使用者可以透過"Detail button"進入看餐廳的詳細資訊
- 使用者可以透過"Delete button" & "刪除餐廳" 移除不想要的餐廳
- 可以透過 Facebook Login 直接登入

提供兩組帳密供測試：

- email: 'user1@example.com', password: '12345678'
- email: 'user2@example.com', password: '12345678'

### 安裝

0.安裝 MongoDB/安裝 Robo 3T/啟動、連線 MongoDB 資料庫

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/Goater1095/Restaurant-List-User_authentication.git
```

2.初始

```
cd Restaurant-List-User_authentication //切至專案資料夾
```

```
npm install  //安裝套件
```

3.開啟程式

```
npm run dev  //執行程式
```

終端顯示 This Server start on http://localhost:3000
即啟動完成，請至 http://localhost:3000 開始使用程式

### 使用工具

- Visual Studio Code - 開發環境
- Node.js - 執行環境
- Express - 應用程式架構

#### 相關插件

- "bcryptjs": "^2.4.3",
- "body-parser": "^1.19.0",
- "connect-flash": "^0.1.1",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-handlebars": "^5.1.0",
- "express-session": "^1.17.1",
- "method-override": "^3.0.0",
- "mongoose": "^5.10.9",
- "passport": "^0.4.1",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"
