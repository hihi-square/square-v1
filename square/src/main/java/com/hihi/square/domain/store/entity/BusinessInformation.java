package com.hihi.square.domain.store.entity;

import java.time.LocalDate;

import javax.persistence.Column;
<<<<<<< HEAD
=======
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
<<<<<<< HEAD
=======
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
<<<<<<< HEAD
@Table(name = "business_information")
public class BusinessInformation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sbi_id")
	private Integer sbiId;

	@OneToOne
	@JoinColumn(name = "usr_id")
	private Store store;

	@Column(name = "company_registration_number")
	private Integer companyRegistrationNumber;

	@Column(name = "ceo_name")
	private String ceoName;

	@Column(name = "opening_date")
	private LocalDate openingDate;

	@Column(name = "corporate_registration_number")
	private Integer corporateRegistrationNumber;

	@Column(name = "business_name")
	private String businessName;

	@Column(name = "business_file")
	private String businessFile;

	public void setStore(Store store) {
		this.store = store;
	}
}

=======
@Table(name="business_information")
public class BusinessInformation {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sbi_id")
	private Integer sbiId;

	@OneToOne
	@JoinColumn(name="usr_id")
	private Store store;

	@Column(name="company_registration_number")
	private Integer companyRegistrationNumber;

	@Column(name="ceo_name")
	private String ceoName;

	@Column(name="opening_date")
	private LocalDate openingDate;

	@Column(name="corporate_registration_number")
	private Integer corporateRegistrationNumber;

	@Column(name="business_name")
	private String businessName;

	@Column(name="business_file")
	private String businessFile;

	public void setStore(Store store){
		this.store = store;
	}
}
>>>>>>> 5c5fec79860f2613543dbfd4cb240edcebdb6ad1
