import styles from '@/styles/modalDeleteList.module.scss'

interface ModalConfirmationProps {
    closeModal: () => void;
    confirmAction: () => void;
}

export default function ModalConfirmation({ closeModal, confirmAction }: ModalConfirmationProps) {
    return (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <div>Você tem certeza?</div>
                    <div className={styles.modalDeleteOptions}>
                        <button onClick={confirmAction}>Sim</button>
                        <button onClick={closeModal}>Não</button>
                    </div>
                </div>
        </div>
    );
}