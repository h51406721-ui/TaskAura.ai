import app from './app';

if (require.main === module) {
  app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
}

export default app;
