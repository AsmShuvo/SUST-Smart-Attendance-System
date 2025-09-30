import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Hardcoded credentials (would be fetched from backend or imported from JSON in a real app)
const credentials = {
	teacher: { teacher_id: "mumin01", password: "mumin" },
	student: { student_id: "2020331070", password: "2020331070" },
	admin: { admin_id: "admin", password: "admin" }
};

const Login = () => {
	const [userType, setUserType] = useState('teacher');
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (!userId || !password) {
			setError('Please enter both user ID and password.');
			return;
		}

		let valid = false;
		if (userType === 'teacher') {
			valid = userId === credentials.teacher.teacher_id && password === credentials.teacher.password;
		} else if (userType === 'student') {
			valid = userId === credentials.student.student_id && password === credentials.student.password;
		} else if (userType === 'admin') {
			valid = userId === credentials.admin.admin_id && password === credentials.admin.password;
		}

		if (valid) {
			setSuccess('Login successful!');
			Swal.fire({
				icon: 'success',
				title: 'Login Successful',
				text: `Welcome, ${userType}!`,
				timer: 1500,
				showConfirmButton: false,
				background: '#232323',
				color: '#fff'
			});
		} else {
			setError('Invalid credentials.');
		}
	};

	const getPlaceholder = () => {
		if (userType === 'teacher') return 'Teacher ID';
		if (userType === 'student') return 'Student ID';
		return 'Admin ID';
	};

	return (
		<div style={{
			minHeight: '100vh',
			background: '#181818',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<form
				onSubmit={handleSubmit}
				style={{
					background: '#232323',
					padding: '2rem',
					borderRadius: '10px',
					boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
					width: '320px',
					display: 'flex',
					flexDirection: 'column',
					gap: '1.2rem'
				}}
			>
				<h2 style={{ color: '#fff', textAlign: 'center', margin: 0 }}>Login</h2>
				<select
					value={userType}
					onChange={e => {
						setUserType(e.target.value);
						setUserId('');
						setPassword('');
						setError('');
						setSuccess('');
					}}
					style={{
						padding: '0.7rem',
						borderRadius: '5px',
						border: 'none',
						background: '#2c2c2c',
						color: '#fff'
					}}
				>
					<option value="teacher">Teacher</option>
					<option value="student">Student</option>
					<option value="admin">Admin</option>
				</select>
				<input
					type="text"
					placeholder={getPlaceholder()}
					value={userId}
					onChange={e => setUserId(e.target.value)}
					style={{
						padding: '0.8rem',
						borderRadius: '5px',
						border: 'none',
						background: '#2c2c2c',
						color: '#fff'
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{
						padding: '0.8rem',
						borderRadius: '5px',
						border: 'none',
						background: '#2c2c2c',
						color: '#fff'
					}}
				/>
				{error && (
					<div style={{ color: '#ff4d4f', textAlign: 'center', fontSize: '0.95rem' }}>
						{error}
					</div>
				)}
				{success && (
					<div style={{ color: '#4caf50', textAlign: 'center', fontSize: '0.95rem' }}>
						{success}
					</div>
				)}
				<button
					type="submit"
					style={{
						padding: '0.8rem',
						borderRadius: '5px',
						border: 'none',
						background: '#0070f3',
						color: '#fff',
						fontWeight: 'bold',
						cursor: 'pointer',
						letterSpacing: '1px'
					}}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
