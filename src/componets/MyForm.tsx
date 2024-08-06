import React, { useState, FormEvent } from 'react';
import './MyForm.css';

const MyForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const validationErrors: { name?: string; email?: string } = {};
        if (!name) {
            validationErrors.name = 'Name is required';
        }
        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'Email is invalid';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log('Name:', name);
        console.log('Email:', email);

        setName('');
        setEmail('');
        setSubmitted(true);
    };

    return (
        <div className="my-form">
            {submitted ? (
                <p>Seu formulario foi enviado</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            required
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            )}
        </div>
    );
};

export default MyForm;
