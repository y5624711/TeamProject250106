package com.example.backend.service.login;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.mapper.login.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
    private final JwtEncoder jwtEncoder;
    final LoginMapper mapper;

    public String token(Employee employee) {

        Employee db = mapper.selectById(employee.getEmployeeNo());
        System.out.println("db = " + db);
        List<String> auths = mapper.selectAuthByCommonCode(employee.getEmployeeNo());
        System.out.println("auths = " + auths);
        String authString = auths.stream().collect(Collectors.joining(" "));

        if (db != null) {
            if (db.getEmployeePassword().equals(employee.getEmployeePassword())) {
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .subject(employee.getEmployeeNo())
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .claim("scope", authString)
                        .build();

                return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
            }
        }

        return null;
    }
}
