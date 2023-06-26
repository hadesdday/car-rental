package com.carrental.service.impl;

import com.carrental.constance.ErrorMessage;
import com.carrental.entity.*;
import com.carrental.enums.CarStatus;
import com.carrental.enums.RentalStatus;
import com.carrental.enums.UserStatus;
import com.carrental.repository.ICarRepository;
import com.carrental.requestmodel.CarAdminRequest;
import com.carrental.requestmodel.CarRegisterRequest;
import com.carrental.requestmodel.ExtraFeeRequest;
import com.carrental.responsemodel.*;
import com.carrental.service.*;
import com.carrental.utils.ModelMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarService implements ICarService {
    @Autowired
    private ICarRepository carRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private IServiceTypeService serviceTypeService;
    @Autowired
    private IModelService modelService;
    @Autowired
    private IBrandService brandService;
    @Autowired
    private IFeatureService featureService;
    @Autowired
    private ICarRentalService rentalService;
    @Autowired
    private ICarImageService imageService;
    @Autowired
    private IExtraFeeService extraFeeService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private DistrictService districtService;
    @Autowired
    private WardService wardService;
    @Autowired
    private ProvinceService provinceService;
    @Autowired
    private ModelMapperUtils mpu;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public String findByPlate(String plate) {
        CarEntity car = carRepository.findFirstByPlateEqualsIgnoreCase(plate);
        if (null == car) return "";
        return car.getPlate();
    }

    @Override
    @Transactional
    public CarRegisterResponse registerNewCar(CarRegisterRequest request) throws Exception {
        String existedPlate = findByPlate(request.getPlate());
        if (!existedPlate.isEmpty()) throw new Exception("Biển số xe đã được đăng ký trên hệ thống vui lòng thử lại !");
        UserEntity user = userService.findByUsername(request.getUsername());
        if (null == user || user.getStatus() != UserStatus.ACTIVATED)
            throw new Exception("Không tìm thấy người dùng hợp lệ !");

        ServiceTypeEntity serviceType = serviceTypeService.findById(request.getServiceTypeId());

        ServiceFeeEntity serviceFee = ServiceFeeEntity.builder()
                .serviceType(serviceType)
                .defaultPrice(request.getDefaultPrice())
                .discountByWeek(request.getDiscountByWeek())
                .discountByMonth(request.getDiscountByMonth())
                .build();

        List<ExtraFeeEntity> extraFees = request.getExtraFees().stream().map(
                i -> ExtraFeeEntity.builder()
                        .name(i.getName())
                        .limitValue(i.getLimit())
                        .unit(i.getUnit())
                        .fee(i.getFee())
                        .serviceFee(serviceFee)
                        .build()
        ).collect(Collectors.toList());

        serviceFee.setExtraFeeList(extraFees);

        WardEntity ward = wardService.findById(request.getWardId());
        DistrictEntity district = districtService.findById(request.getDistrictId());
        ProvinceEntity province = provinceService.findById(request.getProvinceId());

        DeliveryAddressEntity address = DeliveryAddressEntity.builder()
                .addressName(request.getAddressName())
                .ward(ward)
                .district(district)
                .province(province)
                .build();

        CarEntity carEntity = CarEntity.builder()
                .plate(request.getPlate())
                .description(request.getDescription())
                .yearOfManufacture(request.getYearOfManufacture())
                .seats(request.getSeats())
                .color(request.getColor())
                .fuel(request.getFuel())
                .fuelConsumption(request.getFuelConsumption())
                .transmission(request.getTransmission())
                .status(CarStatus.PENDING_APPROVAL)
                .isFastRent(request.getIsFastRent())
                .service(serviceFee)
                .model(modelService.findById(request.getModelId()))
                .brand(brandService.findById(request.getBrandId()))
                .address(address)
                .policies(request.getPolicies())
                .user(user)
                .build();

        List<CarImagesEntity> carImagesList = request.getImagesList().stream().map(i ->
                CarImagesEntity.builder()
                        .imageUrl(i)
                        .isThumbnail(false)
                        .status("ACTIVE")
                        .car(carEntity)
                        .build()
        ).collect(Collectors.toList());
        CarImagesEntity carImagesEntity = carImagesList.get(0);
        carImagesEntity.setIsThumbnail(true);
        carImagesList.set(0, carImagesEntity);
        carEntity.setImages(carImagesList);

        List<FeatureEntity> features = featureService.findAllByIdIn(request.getFeatureList());
        for (int i = 0; i < features.size(); i++) {
            FeatureEntity feat = features.get(i);
            feat.setCars(carEntity);
            features.set(i, feat);
        }
        carEntity.setFeatures(features);
        CarEntity savedCar = carRepository.save(carEntity);
        return CarRegisterResponse.builder()
                .id(savedCar.getId())
                .username(savedCar.getUser().getUsername())
                .plate(savedCar.getPlate())
                .modelId(savedCar.getModel().getId())
                .brandId(savedCar.getBrand().getId())
                .seats(savedCar.getSeats())
                .fuel(savedCar.getFuel())
                .color(savedCar.getColor())
                .fuelConsumption(savedCar.getFuelConsumption())
                .transmission(savedCar.getTransmission())
                .status(savedCar.getStatus())
                .description(savedCar.getDescription())
                .yearOfManufacture(savedCar.getYearOfManufacture())
                .featureList(savedCar.getFeatures().stream().map(BaseEntity::getId).collect(Collectors.toList()))
                .defaultPrice(savedCar.getService().getDefaultPrice())
                .discountByWeek(savedCar.getService().getDiscountByWeek())
                .discountByMonth(savedCar.getService().getDiscountByMonth())
                .isFastRent(savedCar.getIsFastRent())
                .addressName(savedCar.getAddress().getAddressName())
                .extraFees(savedCar.getService().getExtraFeeList().stream().map(
                        i -> mapper.map(i, ExtraFeeRequest.class)).collect(Collectors.toList()))
                .serviceTypeId(savedCar.getService().getId())
                .policies(savedCar.getPolicies())
                .imagesList(savedCar.getImages().stream().map(CarImagesEntity::getImageUrl).collect(Collectors.toList()))
                .build();
    }

    @Override
    public Set<RegisteredCarResponse> findAllRegisteredCar(String username) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<RegisteredCarResponse> query = cb.createQuery(RegisteredCarResponse.class);
        Root<CarEntity> root = query.from(CarEntity.class);

        //car rating join
        Join<CarEntity, CarRatingEntity> carRatingJoin = root.join("ratings", JoinType.LEFT);

        //car rental join
        Join<CarEntity, CarRentalEntity> carRentalEntityJoin = root.join("rentals", JoinType.LEFT);
        Expression<Long> countRental = cb.count(carRentalEntityJoin);

        //car images join
        Join<CarEntity, CarImagesEntity> imageJoin = root.join("images", JoinType.LEFT);
        imageJoin.on(
//                cb.and(
//                        cb.equal(imageJoin.get("car"), root),
                cb.isTrue(imageJoin.get("isThumbnail"))
//                )
        );

        query.multiselect(
                root.get("id"),
                root.get("model").get("name"),
                root.get("service").get("defaultPrice"),
                root.get("status"),
                cb.coalesce(countRental, 0),
                cb.coalesce(cb.avg(carRatingJoin.get("rating")), 0),// return 0 if there is no rating,
                imageJoin.get("imageUrl")
        ).distinct(true);

        query.where(cb.equal(root.get("user").get("username"), username));
        query.groupBy(root.get("id"), imageJoin.get("car").get("id"), imageJoin.get("imageUrl"));

        TypedQuery<RegisteredCarResponse> typedQuery = entityManager.createQuery(query);
        return new HashSet<>(typedQuery.getResultList());
    }

    @Override
    public List<CarAdminResponse> findAll() {
        return carRepository.findAll().stream().map(i ->
                CarAdminResponse.builder()
                        .id(i.getId())
                        .createdDate(i.getCreatedDate())
                        .color(i.getColor())
                        .plate(i.getPlate())
                        .price(i.getService().getDefaultPrice())
                        .brand(
                                IdNameResponse.builder()
                                        .id(i.getBrand().getId())
                                        .name(i.getBrand().getName())
                                        .build()
                        )
                        .model(
                                IdNameResponse.builder()
                                        .id(i.getModel().getId())
                                        .name(i.getModel().getName())
                                        .build()
                        )
                        .serviceType(
                                IdNameResponse.builder()
                                        .id(i.getService().getServiceType().getId())
                                        .name(i.getService().getServiceType().getName())
                                        .build()
                        )
                        .status(i.getStatus())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public CarAdminResponse updateCar(CarAdminRequest request) throws Exception {
        Optional<CarEntity> carOptional = carRepository.findById(request.getId());
        if (!carOptional.isPresent()) throw new Exception(ErrorMessage.NO_CAR_WAS_FOUND);
        BrandEntity brandEntity = brandService.findById(request.getBrand());
        if (null == brandEntity) throw new Exception(ErrorMessage.NO_BRAND_WAS_FOUND);
        ModelEntity modelEntity = modelService.findById(request.getModel());
        if (null == modelEntity) throw new Exception(ErrorMessage.NO_MODEL_WAS_FOUND);
        ServiceTypeEntity serviceType = serviceTypeService.findById(request.getServiceType());
        if (null == serviceType) throw new Exception(ErrorMessage.NO_SERVICE_TYPE_WAS_FOUND);

        CarEntity carEntity = carOptional.get();
        carEntity.setBrand(brandEntity);
        carEntity.setModel(modelEntity);
        ServiceFeeEntity serviceFee = carEntity.getService();
        serviceFee.setServiceType(serviceType);
        serviceFee.setDefaultPrice(request.getPrice());
        carEntity.setService(serviceFee);
        carEntity.setColor(request.getColor());
        carEntity.setStatus(request.getStatus());
        CarEntity updatedCar = carRepository.save(carEntity);
        return CarAdminResponse.builder()
                .id(updatedCar.getId())
                .createdDate(updatedCar.getCreatedDate())
                .color(updatedCar.getColor())
                .plate(updatedCar.getPlate())
                .price(updatedCar.getService().getDefaultPrice())
                .brand(
                        IdNameResponse.builder()
                                .id(updatedCar.getBrand().getId())
                                .name(updatedCar.getBrand().getName())
                                .build()
                )
                .model(
                        IdNameResponse.builder()
                                .id(updatedCar.getModel().getId())
                                .name(updatedCar.getModel().getName())
                                .build()
                )
                .serviceType(
                        IdNameResponse.builder()
                                .id(updatedCar.getService().getServiceType().getId())
                                .name(updatedCar.getService().getServiceType().getName())
                                .build()
                )
                .status(updatedCar.getStatus())
                .build();
    }

    @Override
    public List<SearchCarResponse> searchCar(Specification<CarEntity> spec, Pageable pageable) {
        Page<CarEntity> page = carRepository.findAll(spec, pageable);
        int totalPages = page.getTotalPages();
        return page.getContent().stream().map(i ->
                SearchCarResponse.builder()
                        .id(i.getId())
                        .modelName(i.getModel().getName() + " " + i.getYearOfManufacture())
                        .yearOfManufacture(i.getYearOfManufacture())
                        .location(i.getAddress().getDistrict().getName() + ", " + i.getAddress().getProvince().getName())
                        .price(i.getService().getDefaultPrice())
                        .avgRating(i.getAvgRating())
                        .totalCompletedRental(rentalService.countByStatusAndCarId(RentalStatus.COMPLETED, i.getId()))
                        .features(i.getFeatures().stream().map(item -> mapper.map(item, FeatureDTO.class)).collect(Collectors.toList()))
                        .bannerUrl(imageService.findFirstByCarIdAndIsThumbnail(i.getId(), true).getImageUrl())
                        .transmission(i.getTransmission())
                        .deliveryToTenantFee(extraFeeService.findDeliveryToTenantFee(i.getService().getId()))
                        .type(i.getModel().getType())
                        .totalPages(totalPages)
                        .serviceType(i.getServiceType())
                        .build()
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<CarEntity> findById(Long id) {
        return carRepository.findById(id);
    }

    @Override
    public List<CarResponse> findAllByUserId(Long ownerId, Pageable pageable) {
        List<CarResponse> result = this.mpu.mapAll(this.carRepository.findAllByUserId(ownerId, pageable), CarResponse.class);
        return result;
    }


    @Override
    public List<CarEntity> findAll(Specification spec, Pageable pageable) {
        return this.carRepository.findAll(spec, pageable).getContent();
    }

}
