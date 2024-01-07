import HeaderComponent from '~/components/header_component';

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderComponent />
      <div className="max-w-[1440px] w-full mx-auto">{children}</div>
    </>
  );
}
