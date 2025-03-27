import '@mui/material/styles';
import '@mui/material/Grid';

// MUI Grid 컴포넌트 오버라이드
declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
  }
}

// 필요한 경우 MUI의 다른 컴포넌트도 여기에 타입 확장 