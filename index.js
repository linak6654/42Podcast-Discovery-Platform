const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', interests: [], favoritePodcasts: [] },
  // 添加更多用户数据...
];

// 模拟播客数据存储
const podcasts = [
  { id: 1, title: 'Podcast 1', description: 'Description 1', tags: ['Technology', 'Science'] },
  { id: 2, title: 'Podcast 2', description: 'Description 2', tags: ['Science', 'Health'] },
  // 添加更多播客数据...
];

// 处理获取所有播客的请求
app.get('/podcasts', (req, res) => {
  res.json({ podcasts });
});

// 处理获取用户兴趣标签的请求
app.get('/interests/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ interests: user.interests });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加兴趣标签的请求
app.post('/interests/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { interest } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    user.interests.push(interest);
    res.json({ message: 'Interest added successfully', interests: user.interests });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理根据兴趣标签获取播客的请求
app.get('/podcasts/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 根据用户兴趣标签过滤播客数据
    const recommendedPodcasts = podcasts.filter((podcast) =>
      user.interests.some((interest) => podcast.tags.includes(interest))
    );

    res.json({ recommendedPodcasts });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
