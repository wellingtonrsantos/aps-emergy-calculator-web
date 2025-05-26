# APS Emergy Calculator Web Application

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern React web application for calculating emergy (environmental accounting) from either user-provided CSV/Excel files or using the system's integrated LCI database.

## About the Project

This application provides an interface for performing emergy calculations and sustainability analysis. It offers two main calculation methods:

1. **File-based Calculation**: Upload your own CSV or Excel files containing energy consumption data
2. **System LCI Database**: Use pre-configured life cycle inventory data from the system

The application communicates with the [APS Emergy Calculator Service](https://github.com/wellingtonrsantos/aps-emergy-calculator-service) API for performing calculations.

## Features

- User authentication and authorization
- File upload for CSV/Excel data
- Integration with system LCI database
- Detailed emergy calculations and results
- Sustainability indicators (EYR, ELR, ESI)
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running instance of [APS Emergy Calculator Service](https://github.com/wellingtonrsantos/aps-emergy-calculator-service)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/wellingtonrsantos/aps-emergy-calculator-web.git
cd aps-emergy-calculator-web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create configuration (if needed):

- The API URL is configured in `src/services/api.ts`
- Default is `http://localhost:8000/api`

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Build for production:

```bash
npm run build
# or
yarn build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview production build

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- React Query
- Radix UI Components
- Lucide Icons

## Project Structure

```
src/
  ├── components/    # Reusable components
  ├── contexts/      # React contexts
  ├── hooks/         # Custom hooks
  ├── lib/           # Utility functions
  ├── pages/         # Page components
  ├── routes/        # Route definitions
  ├── services/      # API services
  └── types/         # TypeScript types
```

## API Integration

This application requires the [APS Emergy Calculator Service](https://github.com/wellingtonrsantos/aps-emergy-calculator-service) to be running. Make sure to:

1. Set up and run the API service
2. Configure the correct API URL in `src/services/api.ts`
3. Ensure CORS is properly configured on the API side

## License

This project is licensed under the MIT License - see the LICENSE file for details.
