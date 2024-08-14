package com.example.demo.repo;

import com.example.demo.model.CouponModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CouponRepo extends JpaRepository<CouponModel, Long> {
    Optional<CouponModel> findByCode(String code); // This should now work

	List<CouponModel> findByMerchant(String merchant);
}
