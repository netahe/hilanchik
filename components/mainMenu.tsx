import Link from "next/link";

export const MainMenu = () => (
  <nav>
    <ul>
      <li>
        <Link href="/update">עדכון שעות</Link>
      </li>
      <li>
        <Link href="/reports">דוחות</Link>
      </li>
      <li>
        <Link href="/settings">הגדרות</Link>
      </li>
    </ul>
  </nav>
);
