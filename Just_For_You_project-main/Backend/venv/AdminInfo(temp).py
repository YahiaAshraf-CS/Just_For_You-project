from werkzeug.security import generate_password_hash

print(generate_password_hash("Admin2025"))
# pbkdf2:sha256:600000$mrMBbwCthWKcM72i$9c3d6f08d0ed09f7884ea70234ac612149259c77212aca3c7fb16b8ab1b4b7cf

# First name: Admin
# Last name: User
# Email: AdminJustForYou2025@gmail.com
# Password: Admin2025
# Hash password: pbkdf2:sha256:600000$mrMBbwCthWKcM72i$9c3d6f08d0ed09
# is_admin = True


# INSERT INTO user (firstName, lastName, number, email, password, is_admin)
# VALUES (
#   'Admin',
#   'User',
#   '0000000000',
#   'AdminJustForYou2025@gmail.com',
#   'pbkdf2:sha256:600000$mrMBbwCthWKcM72i$9c3d6f08d0ed09',
#     1
# );
