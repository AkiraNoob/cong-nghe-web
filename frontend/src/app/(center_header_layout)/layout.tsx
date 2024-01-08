import { Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link className="mx-auto w-fit block" href={'/'}>
        <div className="items-center justify-center pt-7 w-full flex">
          <Image src={'/images/CodePro.png'} width={40} height={40} alt="Logo" className="rounded-full" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: 4,
            }}
          >
            CODEPRO
          </Typography>
        </div>
      </Link>
      <div className="max-w-[1440px] w-full mx-auto">{children}</div>
    </>
  );
}
