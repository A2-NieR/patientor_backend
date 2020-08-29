import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import diagnoseRouter from './routes/diagnosis';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.use(express.static('build/frontend'));

app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
