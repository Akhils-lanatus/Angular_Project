import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from 'mongoose';
import TaskRoutes from './routes/task.routes.js';
const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  await mongoose
    .connect(process.env.MONGO_URI!)
    .then((x) => console.log(`DB CONNECTED TO :: ${x.connection.host}`))
    .catch((err) => console.log(`DB CONNECTION ERROR :: ${err}`));
})();

//middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/task', TaskRoutes);
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
