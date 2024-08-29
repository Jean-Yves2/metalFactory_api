import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

// Recommended by ANSSI (Agence nationale de la sécurité des systèmes d'information) IN FRENCH

export class PasswordDto {
  @IsString()
  @MinLength(12, {
    message: 'Le mot de passe doit contenir au moins 12 caractères',
  })
  @MaxLength(100, {
    message: 'Le mot de passe doit contenir au maximum 100 caractères',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial',
    },
  )
  password: string;
}
