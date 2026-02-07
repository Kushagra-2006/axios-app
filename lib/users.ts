import bcrypt from 'bcryptjs';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

// In-memory user storage (for MVP - replace with database in production)
const users: User[] = [
    {
        id: '1',
        name: 'Demo User',
        email: 'demo@axioslab.com',
        password: bcrypt.hashSync('demo123', 10),
        createdAt: new Date(),
    }
];

export async function createUser(name: string, email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    };

    users.push(newUser);
    return newUser;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    return users.find(u => u.email === email);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function getAllUsers(): User[] {
    return users;
}
