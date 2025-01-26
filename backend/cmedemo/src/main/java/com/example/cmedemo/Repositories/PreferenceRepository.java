package com.example.cmedemo.Repositories;

import com.example.cmedemo.Models.Preference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreferenceRepository extends JpaRepository<Preference, Long> {
    List<Preference> findByEmployeeIdAndStartDateAndEndDate(String employeeId, String startDate, String endDate);
}
