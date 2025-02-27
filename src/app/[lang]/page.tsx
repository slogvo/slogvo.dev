import LocaleSwitcher from '@/components/locale-switcher';
import { type Locale } from '@/configs/i18n.config';

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  return (
    <div>
      <LocaleSwitcher />
      <div>
        <p>Current locale: {lang}</p>
        <p>This text is rendered on the server: </p>
      </div>
    </div>
  );
}
