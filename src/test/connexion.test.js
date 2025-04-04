import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Connexion from '../main/js/pages/connexion/Connexion';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Connexion Component', () => {
    test('renders Connexion component and handles form submission', async () => {
        render(
            <Router>
                <Connexion />
            </Router>
        );

        // Vérifier que les champs de saisie sont présents
        const nomInput = screen.getByPlaceholderText('DUPONT');
        const prenomInput = screen.getByPlaceholderText('Laurent');
        const codeInput = screen.getByPlaceholderText('A123');
        const submitButton = screen.getByText('Suivant');

        expect(nomInput).toBeInTheDocument();
        expect(prenomInput).toBeInTheDocument();
        expect(codeInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        // Simuler la saisie des valeurs dans les champs
        fireEvent.change(nomInput, { target: { value: 'DUPONT' } });
        fireEvent.change(prenomInput, { target: { value: 'Laurent' } });
        fireEvent.change(codeInput, { target: { value: 'A123' } });

        // Simuler la soumission du formulaire
        fireEvent.click(submitButton);

        // Attendre que la requête fetch soit terminée et vérifier le résultat
        await waitFor(() => {
            expect(screen.queryByText('Utilisateur inconnu')).not.toBeInTheDocument();
        });
    });

    test('shows error messages for empty fields', () => {
        render(
            <Router>
                <Connexion />
            </Router>
        );

        const submitButton = screen.getByText('Suivant');
        fireEvent.click(submitButton);

        expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
        expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
        expect(screen.getByText('Le code d\'accès est requis')).toBeInTheDocument();
    });
});