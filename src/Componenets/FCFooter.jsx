import React from 'react'
import styles from "../Styles/footer.module.css"
import { useTranslation } from 'react-i18next';

export default function FCFooter() {
  const { t } = useTranslation();
  return (
    <div className={styles.divContainer}><span className={styles.span}>&copy;</span> {t("Footer")}</div>
  )
}
